import KVMap from "../KVMap";
import Module from "../Module";

declare global {
    interface ILoadModule {
        getBundle(data: BundleParam): IWarpperBundle | Promise<IWarpperBundle>;
    }
    interface IModules {
        load: ILoadModule;
    }

    interface BundleParam {
        name: string;
        version?: string;
    }
    interface IWarpperBundle {
        load<T extends cc.Asset>(path: string): Promise<T>;
    }
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadModule extends Module implements ILoadModule {
    protected _bundleCache: KVMap<string, WarpperBundle> = new KVMap();
    getBundle(data: BundleParam): IWarpperBundle | Promise<IWarpperBundle> {
        const self = this;
        let key = data.name + `-${!!data.version ? data.version : ''}`;
        let warpBundle = self._bundleCache.get(key);
        if (!!warpBundle) return warpBundle;
        if (!!cc.assetManager.getBundle(data.name)) {
            warpBundle = new WarpperBundle(cc.assetManager.getBundle(data.name));
            self._bundleCache.set(key, warpBundle);
            return warpBundle;
        }

        return new Promise((res, rej) => {
            const loadBundle = function (err, bundle) {
                if (err) {
                    rej(err)
                    return;
                }
                warpBundle = new WarpperBundle(bundle);
                self._bundleCache.set(key, warpBundle);
                res(warpBundle);
            }
            if (!!data.version) {
                cc.assetManager.loadBundle(data.name, { version: data.version }, loadBundle);
            } else {
                cc.assetManager.loadBundle(data.name, loadBundle);
            }
        })
    }

}
class WarpperBundle implements IWarpperBundle {
    protected _bundle: cc.AssetManager.Bundle;
    constructor(bundle: cc.AssetManager.Bundle) {
        this._bundle = bundle;
    }

    load<T extends cc.Asset>(path: string): Promise<T> {
        return new Promise((res, rej) => {
            this._bundle.load(path, function (err, asset) {
                if (!!err) {
                    rej(err);
                } else {
                    res(asset as T);
                }
            })
        })
    }
}


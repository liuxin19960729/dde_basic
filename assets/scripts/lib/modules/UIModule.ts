import Entry from "../Entry";
import Module from "../Module";
import UIPage from "../ui/UIPage";

declare global {
    interface IUIModule {

    }
    interface IModules {
        ui: IUIModule
    }

    interface UIConfig {
        bundle?: BundleParam,
        name: string,
    }

    interface IPage {

    }
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIModule extends Module implements IUIModule {
    protected _pages: cc.Node = null;

    OnBeforeInit?(app: Entry): void {
        this._pages = app.pages;
        this.show({ bundle: { name: 'play' }, name: "ui" }).then(v => {
            console.log(v);
        })
    }

    show(cfg: UIConfig, data?: any): Promise<any> {
        return new Promise((res, rej) => {
            let bundle;
            if (!cfg.bundle) {// 公共资源
                bundle = dde.mods.load.getBundle({ name: "resources" })
            } else {
                bundle = dde.mods.load.getBundle(cfg.bundle);
            }
            if (bundle instanceof Promise) {
                bundle.then((v: IWarpperBundle) => {
                    v.load(cfg.name).then(v => res(v)).catch(err => rej(err));
                }).catch(err => {
                    rej(err);
                })
            } else {
                bundle.load(cfg.name).then(v => res(v)).catch(err => rej(err));
            }
        })
    }


    protected _doShow() {

    }


    hide(cfg: UIConfig | UIPage) {

    }
}

class Page implements IPage {

    show() {

    }

    hide() {

    }
}
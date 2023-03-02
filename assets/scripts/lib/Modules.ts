import Entry from "./Entry";
import Module from "./Module";

declare global {
    interface IModules { }
    namespace dde {
        const mods: IModules;
    }
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class Modules extends cc.Component {

}

class DDE {
    protected mods: { [key: string]: Module } = {};
    protected log(...args: any[]) {
        console.log(...args)
    }
    register(name: string, mod: Module) {
        if (!name || !mod) {
            throw new Error("name or  mod  value  error");
        }
        if (!!this.mods[name]) {
            throw new Error(`${name} module 重复注册`);
        }
        this.mods[name] = mod;
        this.log(`${name} module register success`)
    }
    protected _isRunning: boolean = false;
    protected _totalTimes: number = 0;

    async init(entry: Entry): Promise<any> {
        Object.values(this.mods).forEach(v => v.OnBeforeInit && v.OnBeforeInit(entry));

        let inits = Object.values(this.mods).filter(v => v.OnInit);

        await Promise.all(inits.map(v => v.OnInit(entry)))

        Object.values(this.mods).forEach(v => v.OnAfterInit && v.OnAfterInit(entry));

        this._updates = Object.values(this.mods).filter(v => !!v.OnUpdate) || [];
        this._updateAfters = Object.values(this.mods).filter(v => !!v.OnUpdateAfter) || [];
        return Promise.resolve();
    }


    get isRuning(): boolean {
        return this._isRunning;
    }


    get totalTimes(): number {
        return this._totalTimes;
    }
    protected _updates: Module[] = null;
    protected _updateAfters: Modules[] = null;
    update(dt: number) {
        if (!this._isRunning) return;
        this._totalTimes += dt;
        if (this._updates.length > 0)
            this._updates.forEach(v => v.OnUpdate(dt, this._totalTimes));
        if (this._updateAfters.length > 0)
            this._updates.forEach(v => v.OnUpdateAfter(dt, this._totalTimes));
    }

}

const eng = new DDE();

(<any>window)['dde'] = eng;

export { eng };
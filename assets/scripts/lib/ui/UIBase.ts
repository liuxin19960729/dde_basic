

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase<T = undefined> extends cc.Component {
    private _data: T;

    protected get data(): T {
        return this._data;
    }
    setData(v: T) {
        this._data = v;
    }
}

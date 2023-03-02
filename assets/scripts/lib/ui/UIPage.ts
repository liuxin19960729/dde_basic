import UIBase from "./UIBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UIPage<T = undefined> extends UIBase<T>{
    readonly $page: IPage = null;
}

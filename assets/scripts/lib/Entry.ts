
const { ccclass, property } = cc._decorator;
import { eng } from "./Modules";
@ccclass
export default abstract class Entry extends cc.Component {
    @property({ type: cc.Node, tooltip: '页面根节点' })
    pages: cc.Node = null;
    protected async start() {
        console.log(typeof [])
        await eng.init(this)
    }

    protected abstract startGame();

    updated(dt: number) {
        eng.update(dt);
    }
}

import Entry from "./Entry";
import { eng } from "./Modules";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Module extends cc.Component {
    protected onLoad(): void {
        eng.register(this.node.name, this);
    }

    OnBeforeInit?(app: Entry): void;
    OnInit?(app: Entry): Promise<any>;
    OnAfterInit?(app: Entry): void;

    OnUpdate?(dt: number, totalTimes): void;
    OnUpdateAfter?(dt: number, totalTimes): void;

}

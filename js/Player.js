import {Brick} from "./Brick";
import {KeyCode, EventTrigger} from "./EventTrigger";

export class Player extends Brick {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.is_static = false;
        this.event = new EventTrigger();
    }

    update() {
        super.update();
        this.ax = 0;
        if (this.event.is_keydown(KeyCode.left)) {
            this.ax = -0.3;
        }
        if (this.event.is_keydown(KeyCode.right)) {
            this.ax = 0.3;
        }
        this.vx*=0.95;
    }
}
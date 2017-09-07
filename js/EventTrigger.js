export class KeyCode {
    static get left() {
        return "37";
    }

    static get right() {
        return "39";
    }

    static get up() {
        return "38";
    }

    static get down() {
        return "40";
    }
}

export class EventTrigger {
    constructor() {
        this.keyBuf = {};
        addEventListener("keydown", (e) => {
            this.keyBuf[e.keyCode] = true;
        }, false);
        addEventListener("keyup", (e) => {
            this.keyBuf[e.keyCode] = false;
        }, false);
    }

    is_keydown(k) {
        return this.keyBuf[k] == true;
    }
}
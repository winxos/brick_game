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
let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export class EventTrigger {
    constructor() {
        if (__instance()) return __instance();
        this.keyBuf = {};
        addEventListener("keydown", (e) => {
            this.keyBuf[e.keyCode] = true;
        }, false);
        addEventListener("keyup", (e) => {
            this.keyBuf[e.keyCode] = false;
        }, false);
        __instance(this);
    }

    is_keydown(k) {
        return this.keyBuf[k] == true;
    }
}
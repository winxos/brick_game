import {ShapeFactory, Shape} from "./Shape";

export {ShapeFactory}

export class Body {
    constructor() {
        this.is_static = false;
        this.is_visiable = true;
        this.shape = new Shape();
        this.hit_checked = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }

    update() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
    };

    render() {
    };
}
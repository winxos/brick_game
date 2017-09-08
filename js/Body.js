import {ShapeFactory, Shape} from "./Shape";

export {ShapeFactory}

export class Body {
    constructor() {
        this.is_static = false;
        this.is_visiable = true;
        this.shape = new Shape();
        this.hit_checked = false;
    }

    update() {

    };

    render() {
    };
}
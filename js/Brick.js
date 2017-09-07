import {Body} from "./Body"
export class Brick extends Body{
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 20;
        this.fill_color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")";
    }

    render(g) {
        g.fillStyle = this.fill_color;
        g.fillRect(this.x, this.y, this.w, this.h);
    }
}
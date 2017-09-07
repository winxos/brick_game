import {Body} from "./Body"

export class Ball extends Body {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.vx = 5;
        this.vy = 5;
        this.ax = 0;
        this.ay = 1;
        this.r = 10;
        this.fill_color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")";
    }

    update() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.left = this.x - this.r;
        this.right = this.x + this.r;
        this.top = this.y - this.r;
        this.down = this.y + this.r;
    }

    render(g) {
        g.fillStyle = this.fill_color;
        g.beginPath();
        g.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        g.fill();
        g.closePath();
    }
}
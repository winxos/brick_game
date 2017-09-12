import {Body, ShapeFactory} from "./Body"

export class Ball extends Body {
    constructor(x, y, vx = 5, vy = 5, r = 20) {
        super();
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.r = r;
        this.fill_color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")";
        this.shape = ShapeFactory.create_circle(this.r);
    };

    update() {
        super.update();
        this.left = this.x - this.r;
        this.right = this.x + this.r;
        this.top = this.y - this.r;
        this.down = this.y + this.r;
    };

    render(g) {
        g.fillStyle = this.fill_color;
        g.beginPath();
        g.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        g.fill();
        g.closePath();
    };
}
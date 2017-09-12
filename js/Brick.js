import {Body, ShapeFactory} from "./Body"

export class Brick extends Body {
    constructor(x, y, w = 40, h = 20, c = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")") {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill_color = c;
        this.shape = ShapeFactory.create_rect(w, h);
    };

    update() {
        super.update();
    }

    render(g) {
        g.fillStyle = this.fill_color;
        g.fillRect(this.x, this.y, this.w, this.h);
    };
}
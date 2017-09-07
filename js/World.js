import {Ball} from "./Ball"
import {Brick} from "./Brick"
import {Player} from "./Player"
import {KeyCode, EventTrigger} from "./EventTrigger";

export class World {
    constructor(canvas) {
        this.bodies = Array();
        this.bodies.push(new Ball(400, 200));
        this.canvas = canvas;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.g = this.canvas.getContext("2d");
        this.event = new EventTrigger();
    }


    update() {
        for (var b of this.bodies) {
            b.update();
            if (b.left < 0 || b.right > this.w) {
                b.x -= b.vx;
                b.vx = -b.vx;
            }
            if (b.top < 0 || b.down > this.h) {
                b.y -= b.vy;
                b.vy = -b.vy;
            }
        }
    }

    draw_bg() {
        this.g.fillStyle = "white";
        this.g.clearRect(0, 0, this.w, this.h);
        this.g.lineWidth = 5;
        this.g.strokeRect(0, 0, this.w, this.h);
        this.g.fillStyle = "green";
        this.g.fillText("KeyPress", this.w - 150, this.h - 50);
        this.g.fillText("←", this.w - 100, this.h - 100);
        this.g.fillText("↑", this.w - 80, this.h - 120);
        this.g.fillText("→", this.w - 65, this.h - 100);
        this.g.fillText("↓", this.w - 80, this.h - 80);
    }

    render() {
        this.draw_bg();
        for (var b of this.bodies) {
            b.render(this.g);
        }
    }

    run() {
        requestAnimationFrame(() => {
            this.run()
        });
        this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.render();
    }
}
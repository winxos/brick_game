import {Ball} from "./Ball"
import {Brick} from "./Brick"
import {Player} from "./Player"
import {KeyCode, EventTrigger} from "./EventTrigger";

export class World {
    constructor(canvas) {
        this.canvas = canvas;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.g = this.canvas.getContext("2d");
        this.event = new EventTrigger();
        this.bc = document.createElement('canvas');
        this.bc.width = this.w;
        this.bc.height = this.h;
        this.bg = this.bc.getContext("2d");
        this.bodies = Array();
        for (let i = 0; i < 10; i++) {
            this.bodies.push(new Ball(this.w * Math.random() * 0.8 + 50,
                this.h * Math.random() * 0.8 + 50,
                6 * Math.random() - 2, 6 * Math.random() - 2, 16 * Math.random() + 12));
        }
        let wall_sz = 20;
        let wall = new Brick(0, 0, wall_sz, this.h);
        console.log(wall.fill_color);
        this.bodies.push(wall);
        this.bodies.push(new Brick(this.w - wall_sz, 0, wall_sz, this.h, wall.fill_color));
        this.bodies.push(new Brick(wall_sz, 0, this.w - wall_sz * 2, wall_sz, wall.fill_color));
        this.bodies.push(new Brick(wall_sz, this.h - wall_sz, this.w - wall_sz * 2, wall_sz, wall.fill_color));

    }

    is_hit(a, b) {
        if (a.shape.type == null || b.shape.type == null) {
            return false
        }
        switch (a.shape.type) {
            case "RECT":
                break
            case "CIRCLE":
                if (b.shape.type == "RECT") {
                    if (a.x >= b.x - a.r && a.x <= b.x + b.w + a.r &&
                        a.y >= b.y - a.r && a.y <= b.y + b.h + a.r) {
                        if (a.x >= b.x && a.x <= b.x + b.w) {
                            a.y -= a.vy;
                            a.vy = -a.vy;
                        }
                        else {
                            a.x -= a.vx;
                            a.vx = -a.vx;
                        }
                        return true;
                    }
                }
                break
        }
        return false;
    };

    hit_check() {
        for (let i = 0; i < this.bodies.length; i++) {
            if (!this.bodies[i].is_static) {
                for (let j = i + 1; j < this.bodies.length; j++) {
                    if (this.bodies[j].is_static) // only dynamic hit static
                    {
                        if (!this.bodies[i].hit_checked && this.is_hit(this.bodies[i], this.bodies[j])) {
                            this.bodies[i].hit_checked = true;
                        }
                    }
                }
            }
        }
    }

    update() {
        for (var b of this.bodies) {
            b.update();
            b.hit_checked = false;
        }
        this.hit_check();
    }

    draw_bg() {
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
        this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.render();
        requestAnimationFrame(() => {
            this.run()
        });
    }
}
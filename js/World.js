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
        this.state = "play";
        this.statics = Array();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                this.statics.push(new Brick(50 + i * 100, 50 + j * 30, 80, 20));
            }
        }
        let wall_sz = 20;
        let wall_up = new Brick(0, 0, wall_sz, this.h);
        wall_up.is_static = true;
        let wall_right = new Brick(this.w - wall_sz, 0, wall_sz, this.h, wall_up.fill_color);
        wall_right.is_static = true;
        let wall_left = new Brick(wall_sz, 0, this.w - wall_sz * 2, wall_sz, wall_up.fill_color);
        wall_left.is_static = true;
        let wall_down = new Brick(wall_sz, this.h - wall_sz, this.w - wall_sz * 2, wall_sz, wall_up.fill_color);
        wall_down.is_static = true;
        this.statics.push(wall_up);
        this.statics.push(wall_right);
        this.statics.push(wall_left);
        // this.statics.push(wall_down);
        this.player = new Player(this.w / 2, this.h - 50, 150, 20);
        this.ball = new Ball(this.player.x + this.player.w / 2, this.player.y - 40, Math.random() * 6 - 3, -5);
    }

    ball_hit_rect(a, b) {
        if (a.x >= ( b.x - a.r) && a.x <= (b.x + b.w + a.r) &&
            a.y >= (b.y - a.r) && a.y <= (b.y + b.h + a.r)) {
            if (a.x >= b.x && a.x <= (b.x + b.w)) {
                a.x -= a.vx;
                a.y -= a.vy;
                a.vy = -a.vy;
            }
            else {
                a.x -= a.vx;
                a.y -= a.vy;
                a.vx = -a.vx;
            }
            return true;
        }
        return false;
    }

    rect_hit_rect(a, b) {
        if (a.x > (b.x + b.w) || (a.x + a.w) < b.x)
            return false;
        if (a.y > ( b.y + b.h) || ( a.y + a.h) < b.y)
            return false;
        return true;
    }

    is_hit(a, b) {
        return false;
    }

    hit_check() {
        for (let i = 0; i < this.statics.length; i++) {
            if (this.statics[i].is_visiable) {
                if (this.ball_hit_rect(this.ball, this.statics[i])) {
                    if (!this.statics[i].is_static) {
                        this.statics[i].is_visiable = false;
                    }
                    return
                }
                if (this.rect_hit_rect(this.player, this.statics[i])) {
                    this.player.x -= this.player.vx;
                    this.player.vx = -this.player.vx;
                }
            }
        }
        if (this.ball_hit_rect(this.ball, this.player)) {

        }
    }

    update() {
        for (var b of this.statics) {
            b.update();
        }
        this.player.update();
        this.ball.update();
        this.hit_check();
        if (this.ball.y > this.canvas.height) {
            this.state = "game_over";
        }
    }

    draw_bg() {
        this.g.fillStyle = "green";
        this.g.fillText("KeyPress", this.w - 150, this.h - 50);
        this.g.fillText("←", this.w - 100, this.h - 100);
        this.g.fillText("↑", this.w - 80, this.h - 120);
        this.g.fillText("→", this.w - 65, this.h - 100);
        this.g.fillText("↓", this.w - 80, this.h - 80);
    }

    draw_over() {
        this.g.fillStyle = "green";
        this.g.fillText("GAME OVER", this.w / 2, this.h / 2);
    }

    render() {
        switch (this.state) {
            case"play":
                this.draw_bg();
                this.update();
                for (var b of this.statics) {
                    if (b.is_visiable) {
                        b.render(this.g);
                    }
                }
                this.player.render(this.g);
                this.ball.render(this.g);
                break;
            case "game_over":
                this.draw_over();
                break;
        }
    }

    run() {
        this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();
        requestAnimationFrame(() => {
            this.run()
        });
    }
}
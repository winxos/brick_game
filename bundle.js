/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Shape__["b"]; });




class Body {
    constructor() {
        this.is_static = false;
        this.is_visiable = true;
        this.shape = new __WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* Shape */]();
        this.hit_checked = false;
    }

    update() {

    };

    render() {
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Body;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__World__ = __webpack_require__(2);


window.onload = function () {
    let c = window.document.getElementById("c");
    let h = 500, w = 1000;
    c.setAttribute('width', w);
    c.setAttribute('height', h);
    let world = new __WEBPACK_IMPORTED_MODULE_0__World__["a" /* World */](c);
    world.run();
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Ball__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Brick__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Player__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EventTrigger__ = __webpack_require__(6);





class World {
    constructor(canvas) {
        this.canvas = canvas;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.g = this.canvas.getContext("2d");
        this.event = new __WEBPACK_IMPORTED_MODULE_3__EventTrigger__["a" /* EventTrigger */]();
        this.bc = document.createElement('canvas');
        this.bc.width = this.w;
        this.bc.height = this.h;
        this.bg = this.bc.getContext("2d");
        this.bodies = Array();
        for (let i = 0; i < 10; i++) {
            this.bodies.push(new __WEBPACK_IMPORTED_MODULE_0__Ball__["a" /* Ball */](this.w * Math.random() * 0.8 + 50,
                this.h * Math.random() * 0.8 + 50,
                6 * Math.random() - 2, 6 * Math.random() - 2, 16 * Math.random() + 12));
        }
        let wall_sz = 20;
        let wall = new __WEBPACK_IMPORTED_MODULE_1__Brick__["a" /* Brick */](0, 0, wall_sz, this.h);
        console.log(wall.fill_color);
        this.bodies.push(wall);
        this.bodies.push(new __WEBPACK_IMPORTED_MODULE_1__Brick__["a" /* Brick */](this.w - wall_sz, 0, wall_sz, this.h, wall.fill_color));
        this.bodies.push(new __WEBPACK_IMPORTED_MODULE_1__Brick__["a" /* Brick */](wall_sz, 0, this.w - wall_sz * 2, wall_sz, wall.fill_color));
        this.bodies.push(new __WEBPACK_IMPORTED_MODULE_1__Brick__["a" /* Brick */](wall_sz, this.h - wall_sz, this.w - wall_sz * 2, wall_sz, wall.fill_color));

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
/* harmony export (immutable) */ __webpack_exports__["a"] = World;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(0);


class Ball extends __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */] {
    constructor(x, y, vx = 5, vy = 5, r = 10) {
        super();
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 1;
        this.r = r;
        this.fill_color = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")";
        this.shape = __WEBPACK_IMPORTED_MODULE_0__Body__["b" /* ShapeFactory */].create_circle(this.r);
    };

    update() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(0);


class Brick extends __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */] {
    constructor(x, y, w = 40, h = 20, c = "rgba(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + 255 + ")") {
        super();
        console.log(x, y);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill_color = c;
        this.shape = __WEBPACK_IMPORTED_MODULE_0__Body__["b" /* ShapeFactory */].create_rect(w, h);
        this.is_static = true;
    };

    render(g) {
        g.fillStyle = this.fill_color;
        g.fillRect(this.x, this.y, this.w, this.h);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Brick;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Body__ = __webpack_require__(0);


class Player extends __WEBPACK_IMPORTED_MODULE_0__Body__["a" /* Body */] {

}
/* unused harmony export Player */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeyCode {
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
/* unused harmony export KeyCode */


class EventTrigger {
    constructor() {
        this.keyBuf = {};
        addEventListener("keydown", (e) => {
            this.keyBuf[e.keyCode] = true;
        }, false);
        addEventListener("keyup", (e) => {
            this.keyBuf[e.keyCode] = false;
        }, false);
    }

    is_keydown(k) {
        return this.keyBuf[k] == true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventTrigger;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Shape {
    constructor() {
        this.type = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shape;
;

class Rect extends Shape {
    constructor(w, h) {
        super();
        this.type = "RECT";
        this.w = w;
        this.h = h;
    }
};

class Circle extends Shape {
    constructor(r) {
        super();
        this.type = "CIRCLE";
        this.r = r;
    }
};

class ShapeFactory {
    static create_rect(w, h) {
        return new Rect(w, h);
    }

    static create_circle(r) {
        return new Circle(r);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ShapeFactory;
;

/***/ })
/******/ ]);
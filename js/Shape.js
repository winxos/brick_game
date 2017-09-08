export class Shape {
    constructor() {
        this.type = null;
    }
};

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

export class ShapeFactory {
    static create_rect(w, h) {
        return new Rect(w, h);
    }

    static create_circle(r) {
        return new Circle(r);
    }
};
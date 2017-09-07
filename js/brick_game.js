import {World} from "./World"

window.onload = function () {
    let c = window.document.getElementById("c");
    let h = 500, w = 1000;
    c.setAttribute('width', w);
    c.setAttribute('height', h);
    let world = new World(c);
    world.run();
}
"use strict";
class FloorSpace {
    constructor() {
        this.appendToParent = (parent) => {
            parent.appendChild(this.space);
        };
        this.space = document.createElement('div');
        this.space.classList.add("floor");
    }
    get floorSpace() {
        return this.space;
    }
}

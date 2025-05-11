"use strict";
class Line {
    constructor() {
        this.appendToParent = (parent) => {
            parent.appendChild(this.line);
        };
        this.line = document.createElement('div');
        this.line.classList.add("blackline");
    }
}

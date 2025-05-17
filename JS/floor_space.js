export class FloorSpace {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add("floor");
    }
    get floorSpace() {
        return this.element;
    }
    appendToParent(parent) {
        parent.appendChild(this.element);
    }
}

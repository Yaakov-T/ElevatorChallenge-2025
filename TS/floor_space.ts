export class FloorSpace {
    private readonly element: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add("floor");
    }

    get floorSpace(): HTMLDivElement {
        return this.element;
    }

    appendToParent(parent: HTMLElement): void {
        parent.appendChild(this.element);
    }
}

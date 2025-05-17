export class Line {
    private readonly line: HTMLDivElement;

    constructor() {
        this.line = document.createElement('div');
        this.line.classList.add("blackline");
    }

    appendToParent(parent: HTMLElement): void {
        parent.appendChild(this.line);
    }
}

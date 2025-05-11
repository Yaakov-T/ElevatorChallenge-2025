class Line {
    private line: HTMLElement;

    constructor() {
        this.line = document.createElement('div');
        this.line.classList.add("blackline");
    }

    appendToParent = (parent: HTMLElement): void => {
        parent.appendChild(this.line);
    }
}

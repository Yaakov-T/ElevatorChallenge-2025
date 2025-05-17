export class Line {
    constructor() {
        this.line = document.createElement('div');
        this.line.classList.add("blackline");
    }
    appendToParent(parent) {
        parent.appendChild(this.line);
    }
}

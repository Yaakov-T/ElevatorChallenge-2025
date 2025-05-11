class FloorSpace {
    private space: HTMLDivElement;

    constructor() {
        this.space = document.createElement('div');
        this.space.classList.add("floor");
    }

    get floorSpace():HTMLDivElement{
        return this.space;
    }
    
    appendToParent = (parent: HTMLElement): void => {
        parent.appendChild(this.space);
    }
}
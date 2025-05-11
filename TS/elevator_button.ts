
class ElevatorButton {
    private floorNumber: number;
    private parent: SingleFloor;
    private button: HTMLButtonElement;

    constructor(parent: SingleFloor) {
        this.parent = parent;
        this.floorNumber = this.parent.floorNumber;
        this.button = this.createButton();
    }

    private createButton = (): HTMLButtonElement =>{
        const button = document.createElement('button');
        button.classList.add('metal', 'linear');
        button.textContent = `${this.floorNumber}`;
        button.disabled = false;
        button.addEventListener('click', () => {
            this.orderElevator();
        });
        return button;
    }

    appendToParent = (parent: HTMLElement): void => {
        parent.appendChild(this.button);
    }

    orderElevator = (): void=> {
        this.parent.getOrder();
    }

    lockButton = (): void =>{
        this.button.disabled = true;
        this.button.classList.add("greenFont");
    }
    freeButton = (): void => {
        this.button.disabled = false;
        this.button.classList.remove("greenFont");
    }
}

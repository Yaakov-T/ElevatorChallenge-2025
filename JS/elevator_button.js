export class ElevatorButton {
    constructor(parent) {
        this.orderElevator = () => {
            this.parent.getOrder();
        };
        this.parent = parent;
        this.floorNumber = parent.floorNumber;
        this.button = this.createButton();
    }
    createButton() {
        const button = document.createElement('button');
        button.classList.add('metal', 'linear');
        button.textContent = `${this.floorNumber}`;
        button.disabled = false;
        button.addEventListener('click', () => {
            this.orderElevator();
        });
        return button;
    }
    appendToParent(parent) {
        parent.appendChild(this.button);
    }
    lockButton() {
        this.button.disabled = true;
        this.button.classList.add("greenFont");
    }
    freeButton() {
        this.button.disabled = false;
        this.button.classList.remove("greenFont");
    }
}

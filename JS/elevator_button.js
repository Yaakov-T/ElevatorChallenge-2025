"use strict";
class ElevatorButton {
    constructor(parent) {
        this.createButton = () => {
            const button = document.createElement('button');
            button.classList.add('metal', 'linear');
            button.textContent = `${this.floorNumber}`;
            button.disabled = false;
            button.addEventListener('click', () => {
                this.orderElevator();
            });
            return button;
        };
        this.appendToParent = (parent) => {
            parent.appendChild(this.button);
        };
        this.orderElevator = () => {
            this.parent.getOrder();
        };
        this.lockButton = () => {
            this.button.disabled = true;
            this.button.classList.add("greenFont");
        };
        this.freeButton = () => {
            this.button.disabled = false;
            this.button.classList.remove("greenFont");
        };
        this.parent = parent;
        this.floorNumber = this.parent.floorNumber;
        this.button = this.createButton();
    }
}

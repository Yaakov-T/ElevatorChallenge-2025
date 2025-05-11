"use strict";
class SingleFloor {
    constructor(Parent, floorNumber) {
        this.SingleFloor = document.createElement('div');
        this.setDisplay = (time) => {
            this.arrivalDisplay.setTime(time);
        };
        this.getOrder = () => {
            const display = this.parent.getOrder(this.FloorNumber);
            if (display || display === 0) {
                this.setDisplay(display);
                this.elevatorCallButton.lockButton();
            }
        };
        this.freeButton = () => {
            this.elevatorCallButton.freeButton();
        };
        this.appendToParent = (parent) => {
            // Append elements to the singleFloor container
            this.blackLine.appendToParent(this.singleFloor);
            this.floorSpace.appendToParent(this.singleFloor);
            this.elevatorCallButton.appendToParent(this.floorSpace.floorSpace); // Append button to floorSpace
            this.arrivalDisplay.appendToParent(this.floorSpace.floorSpace); // Append display to floorSpace
            // Append singleFloor container to the specified parent element
            parent.appendChild(this.singleFloor);
        };
        this.parent = Parent;
        this.settings = Settings.getInstance();
        this.FloorNumber = floorNumber;
        this.arrivalDisplay = Factory.getInstance().create("ArrivalDisplay", this);
        this.elevatorCallButton = Factory.getInstance().create("ElevatorButton", this);
        this.blackLine = Factory.getInstance().create("Line", null);
        this.floorSpace = Factory.getInstance().create("FloorSpace", null);
    }
    get floorNumber() {
        return this.FloorNumber;
    }
    get singleFloor() {
        return this.SingleFloor;
    }
}

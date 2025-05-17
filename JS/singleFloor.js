import { Settings } from './settings.js';
import { Factory } from './factory.js';
export class SingleFloor {
    constructor(parent, floorNumber) {
        this.floorElement = document.createElement('div');
        this.freeButton = () => {
            this.elevatorCallButton.freeButton();
        };
        this.parent = parent;
        this.settings = Settings.getInstance();
        this.floorNumberValue = floorNumber;
        const factory = Factory.getInstance();
        this.arrivalDisplay = factory.create("ArrivalDisplay", this);
        this.elevatorCallButton = factory.create("ElevatorButton", this);
        this.blackLine = factory.create("Line", null);
        this.floorSpace = factory.create("FloorSpace", null);
    }
    get floorNumber() {
        return this.floorNumberValue;
    }
    get singleFloor() {
        return this.floorElement;
    }
    setDisplay(time) {
        this.arrivalDisplay.setTime(time);
    }
    getOrder() {
        const displayTime = this.parent.getOrder(this.floorNumberValue, this.freeButton);
        if (displayTime || displayTime === 0) {
            this.setDisplay(displayTime);
            this.elevatorCallButton.lockButton();
        }
    }
    appendToParent(parent) {
        this.blackLine.appendToParent(this.floorElement);
        this.floorSpace.appendToParent(this.floorElement);
        this.elevatorCallButton.appendToParent(this.floorSpace.floorSpace);
        this.arrivalDisplay.appendToParent(this.floorSpace.floorSpace);
        parent.appendChild(this.floorElement);
    }
}

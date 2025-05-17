import { Settings } from './settings.js';
import { ElevatorLogic } from './ElevatorLogic.js';
import { ElevatorView } from './ElevatorView.js';
export class Elevator {
    constructor(x) {
        const settings = Settings.getInstance();
        this.view = new ElevatorView(x, settings.elevator, settings.audio);
        this.logic = new ElevatorLogic(this.view);
    }
    appendToParent(parent) {
        this.view.appendTo(parent);
    }
    addNewFloor(floor, onArrival) {
        return this.logic.addNewFloor(floor, onArrival);
    }
    including(floor) {
        return this.logic.includes(floor);
    }
    checkTimeWithFloor(floor) {
        return this.logic.checkTimeWithFloor(floor);
    }
    get timeToNextStop() {
        return this.logic.timeToNextStop;
    }
}

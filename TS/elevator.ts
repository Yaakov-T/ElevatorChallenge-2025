import { Settings } from './settings.js';
import { ElevatorLogic } from './ElevatorLogic.js';
import { ElevatorView } from './ElevatorView.js';

export class Elevator {
    private view: ElevatorView;
    private logic: ElevatorLogic;

    constructor(x: number) {
        const settings = Settings.getInstance();
        this.view = new ElevatorView(x, settings.elevator, settings.audio);
        this.logic = new ElevatorLogic(this.view);
    }

    appendToParent(parent: HTMLElement) {
        this.view.appendTo(parent);
    }

    addNewFloor(floor: number, onArrival: () => void): number {
        return this.logic.addNewFloor(floor, onArrival);
    }

    including(floor: number): boolean {
        return this.logic.includes(floor);
    }

    checkTimeWithFloor(floor: number): number {
        return this.logic.checkTimeWithFloor(floor);
    }

    get timeToNextStop(): number {
        return this.logic.timeToNextStop;
    }
}

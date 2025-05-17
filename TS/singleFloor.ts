import { Building } from './building.js';
import { ElevatorButton } from './elevator_button.js';
import { Line } from './line.js';
import { FloorSpace } from './floor_space.js';
import { ArrivalDisplay } from './arrival_display.js';
import { Settings } from './settings.js';
import { Factory } from './factory.js';

export class SingleFloor {
    private floorElement: HTMLDivElement = document.createElement('div');
    private parent: Building;
    private floorNumberValue: number;
    private elevatorCallButton: ElevatorButton;
    private blackLine: Line;
    private floorSpace: FloorSpace;
    private arrivalDisplay: ArrivalDisplay;
    private settings: Settings;

    constructor(parent: Building, floorNumber: number) {
        this.parent = parent;
        this.settings = Settings.getInstance();
        this.floorNumberValue = floorNumber;

        const factory = Factory.getInstance();
        this.arrivalDisplay = factory.create("ArrivalDisplay", this);
        this.elevatorCallButton = factory.create("ElevatorButton", this);
        this.blackLine = factory.create("Line", null);
        this.floorSpace = factory.create("FloorSpace", null);
    }

    get floorNumber(): number {
        return this.floorNumberValue;
    }

    get singleFloor(): HTMLDivElement {
        return this.floorElement;
    }

    setDisplay(time: number): void {
        this.arrivalDisplay.setTime(time);
    }

    getOrder(): void {
        const displayTime = this.parent.getOrder(this.floorNumberValue, this.freeButton);

        if (displayTime || displayTime === 0) {
            this.setDisplay(displayTime);
            this.elevatorCallButton.lockButton();
        }
    }

    freeButton = (): void => {
        this.elevatorCallButton.freeButton();
    };

    appendToParent(parent: HTMLElement): void {
        this.blackLine.appendToParent(this.floorElement);
        this.floorSpace.appendToParent(this.floorElement);
        this.elevatorCallButton.appendToParent(this.floorSpace.floorSpace);
        this.arrivalDisplay.appendToParent(this.floorSpace.floorSpace);
        parent.appendChild(this.floorElement);
    }
}

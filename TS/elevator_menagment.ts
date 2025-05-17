import { Elevator } from './elevator.js';
import { Settings } from './settings.js';

export class ElevatorMenagment {
    private elevatorsArea: HTMLDivElement;
    private elevators: Elevator[];

    constructor() {
        const settings = Settings.getInstance();
        this.elevators = [];

        for (let i = 0; i < settings.numElevators; i++) {
            const elevator = new Elevator(115 * i + 8);
            this.elevators.push(elevator);
        }

        this.elevatorsArea = this.createElevatorsArea(settings.numElevators);
    }

    private createElevatorsArea(numElevators: number): HTMLDivElement {
        const area = document.createElement('div');
        area.classList.add("rowFlex");
        area.style.width = `${numElevators * 130}px`;
        return area;
    }

    get elevatorsContainer(): HTMLDivElement {
        return this.elevatorsArea;
    }


    getOrder = (floor: number, onArrival: () => void): number | false => {
        let minTime = this.elevators[0].checkTimeWithFloor(floor);
        let bestIndex = 0;

        console.log(`elevator 0 Time: ${minTime}`);

        for (let i = 1; i < this.elevators.length; ++i) {
            if (this.elevators[i].including(floor)) {
                return false; 
            }

            const time = this.elevators[i].checkTimeWithFloor(floor);
            console.log(`elevator ${i} Time: ${time}`);

            if (time < minTime) {
                minTime = time;
                bestIndex = i;
            }
        }

        return this.elevators[bestIndex].addNewFloor(floor, onArrival);
    };

    appendToParent = (parent: HTMLElement): void => {
        this.elevators.forEach(elevator => {
            elevator.appendToParent(this.elevatorsArea);
        });
        parent.appendChild(this.elevatorsArea);
    };
}

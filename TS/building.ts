import { SingleFloor } from './singleFloor.js';
import { ElevatorMenagment } from './elevator_menagment.js';
import { Factory } from './factory.js';
import { Settings } from './settings.js';

export class Building {
    private readonly currentBuilding: HTMLDivElement;
    private readonly floorsArea: HTMLDivElement;
    private readonly floors: SingleFloor[];
    private readonly elevatorManagement: ElevatorMenagment;

    constructor() {
        this.floorsArea = document.createElement("div");
        this.currentBuilding = this.createBuildingElement();
        this.elevatorManagement = this.createElevatorManagement();
        this.floors = this.createFloors();
    }

    private createBuildingElement(): HTMLDivElement {
        const el = document.createElement("div");
        const settings = Settings.getInstance();
        el.style.height = `${settings.floorHeight * settings.numFloors}px`;
        return el;
    }

    private createElevatorManagement(): ElevatorMenagment {
        const manager = Factory.getInstance().create("ElevatorMenagment", null);
        const settings = Settings.getInstance();
        manager.elevatorsArea.style.height = `${settings.floorHeight * settings.numFloors}px`;
        return manager;
    }

    private createFloors(): SingleFloor[] {
        this.floorsArea.style.minWidth = "160px";
        const settings = Settings.getInstance();
        const floors: SingleFloor[] = [];

        for (let i = 0; i < settings.numFloors; i++) {
            const floorNumber = settings.numFloors - i - 1;
            floors.push(Factory.getInstance().create("SingleFloor", [this, floorNumber]));
        }

        return floors;
    }

    get myCurrentBuilding(): HTMLDivElement {
        return this.currentBuilding;
    }

    getOrder(floorNum: number, onArrival: () => void): number | false {
        return this.elevatorManagement.getOrder(floorNum, onArrival);
    }

    private appendFloors(): void {
        this.floorsArea.classList.add("columFlex");
        this.floors.forEach(floor => {
            floor.appendToParent(this.floorsArea);
        });
        this.currentBuilding.appendChild(this.floorsArea);
    }

    private appendElevators(): void {
        const elevatorContainer = document.createElement("div");
        elevatorContainer.classList.add("elevator-management");
        this.elevatorManagement.appendToParent(elevatorContainer);
        this.currentBuilding.appendChild(elevatorContainer);
    }

    appendToParent(parent: HTMLElement): void {
        this.currentBuilding.classList.add("rowFlex");
        this.appendFloors();
        this.appendElevators();
        parent.appendChild(this.currentBuilding);
    }
}

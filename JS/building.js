import { Factory } from './factory.js';
import { Settings } from './settings.js';
export class Building {
    constructor() {
        this.floorsArea = document.createElement("div");
        this.currentBuilding = this.createBuildingElement();
        this.elevatorManagement = this.createElevatorManagement();
        this.floors = this.createFloors();
    }
    createBuildingElement() {
        const el = document.createElement("div");
        const settings = Settings.getInstance();
        el.style.height = `${settings.floorHeight * settings.numFloors}px`;
        return el;
    }
    createElevatorManagement() {
        const manager = Factory.getInstance().create("ElevatorMenagment", null);
        const settings = Settings.getInstance();
        manager.elevatorsArea.style.height = `${settings.floorHeight * settings.numFloors}px`;
        return manager;
    }
    createFloors() {
        this.floorsArea.style.minWidth = "160px";
        const settings = Settings.getInstance();
        const floors = [];
        for (let i = 0; i < settings.numFloors; i++) {
            const floorNumber = settings.numFloors - i - 1;
            floors.push(Factory.getInstance().create("SingleFloor", [this, floorNumber]));
        }
        return floors;
    }
    get myCurrentBuilding() {
        return this.currentBuilding;
    }
    getOrder(floorNum, onArrival) {
        return this.elevatorManagement.getOrder(floorNum, onArrival);
    }
    appendFloors() {
        this.floorsArea.classList.add("columFlex");
        this.floors.forEach(floor => {
            floor.appendToParent(this.floorsArea);
        });
        this.currentBuilding.appendChild(this.floorsArea);
    }
    appendElevators() {
        const elevatorContainer = document.createElement("div");
        elevatorContainer.classList.add("elevator-management");
        this.elevatorManagement.appendToParent(elevatorContainer);
        this.currentBuilding.appendChild(elevatorContainer);
    }
    appendToParent(parent) {
        this.currentBuilding.classList.add("rowFlex");
        this.appendFloors();
        this.appendElevators();
        parent.appendChild(this.currentBuilding);
    }
}

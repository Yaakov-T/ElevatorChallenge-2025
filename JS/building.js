"use strict";
class Building {
    constructor() {
        this.createBuild = () => {
            const currentBuilding = document.createElement("div");
            currentBuilding.style.height = `${(Settings.getInstance().floorHeight) * Settings.getInstance().numFloors}px`;
            return currentBuilding;
        };
        this.createElevatorMenage = () => {
            const elevatorManagement = Factory.getInstance().create("ElevatorMenagment", null);
            elevatorManagement.elevatorsArea.style.height = `${Settings.getInstance().floorHeight * Settings.getInstance().numFloors}px`;
            return elevatorManagement;
        };
        this.createFloors = () => {
            this.floorsarea.style.minWidth = "160px";
            const floors = [];
            for (let i = 0; i < Settings.getInstance().numFloors; i++) {
                floors.push(Factory.getInstance().create("SingleFloor", [this, (Settings.getInstance().numFloors - i - 1)]));
            }
            return floors;
        };
        this.getOrder = (floorNum) => {
            return this.elevatorManagement.getOrder(floorNum);
        };
        this.appFloors = () => {
            this.floorsarea.classList.add("columFlex");
            this.floors.forEach((floor) => {
                floor.appendToParent(this.floorsarea);
            });
            this.currentBuilding.appendChild(this.floorsarea);
        };
        this.appElevator = () => {
            const elevatorContainer = document.createElement("div");
            elevatorContainer.classList.add("elevator-management");
            this.elevatorManagement.appendToParent(elevatorContainer);
            this.currentBuilding.appendChild(elevatorContainer);
        };
        this.appendToParent = (parent) => {
            this.currentBuilding.classList.add("rowFlex");
            this.appFloors();
            this.appElevator();
            parent.appendChild(this.currentBuilding);
        };
        this.floorsarea = document.createElement("div");
        this.currentBuilding = this.createBuild();
        this.elevatorManagement = this.createElevatorMenage();
        this.floors = this.createFloors();
    }
    get mycurrentBuilding() {
        return this.currentBuilding;
    }
}

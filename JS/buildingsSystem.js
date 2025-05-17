import { Factory } from './factory.js';
import { Settings } from './settings.js';
export class BuildingsSystem {
    constructor(buildingErea) {
        this.createBuildings = () => {
            for (let i = 0; i < Settings.getInstance().numBuildings; i++) {
                this.buildingArr.push(Factory.getInstance().create("Building", null));
            }
        };
        this.appendToParent = (parent) => {
            this.buildingArr.forEach((building) => {
                building.appendToParent(parent);
            });
        };
        this.buildingArr = [];
        this.createBuildings();
        this.appendToParent(buildingErea);
    }
}

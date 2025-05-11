"use strict";
class Settings {
    constructor() {
        this.NumBuildings = 2;
        this.NumFloors = 5;
        this.NumElevators = 3;
        this.SecondsToStay = 2;
        this.FloorHeight = 120;
        this.elevatorSRC = `./elements/elv.png`;
        this.audioSRC = `./elements/ding.mp3`;
    }
    static getInstance() {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }
    get floorHeight() { return this.FloorHeight; }
    get numBuildings() { return this.NumBuildings; }
    get numFloors() { return this.NumFloors; }
    get numElevators() { return this.NumElevators; }
    get elevator() { return this.elevatorSRC; }
    get audio() { return this.audioSRC; }
    get secondsToStay() { return this.SecondsToStay; }
}
Settings.instance = null;

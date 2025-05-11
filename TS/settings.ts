class Settings {
    private static instance: Settings | null = null;

    private NumBuildings: number = 2;
    private NumFloors: number = 5;
    private NumElevators: number = 3;
    private SecondsToStay: number = 2;
    private FloorHeight: number = 120;
    private elevatorSRC: string = `./elements/elv.png`
    private audioSRC: string = `./elements/ding.mp3`

    private constructor() {}

    public static getInstance(): Settings {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }

    get floorHeight(): number { return this.FloorHeight; }
    get numBuildings(): number { return this.NumBuildings; }
    get numFloors(): number { return this.NumFloors; }
    get numElevators(): number { return this.NumElevators; }
    get elevator(): string { return this.elevatorSRC; }
    get audio(): string { return this.audioSRC; }
    get secondsToStay(): number { return this.SecondsToStay; }
}

class SingleFloor {
    private SingleFloor: HTMLDivElement = document.createElement('div');
    private parent: Building;
    private FloorNumber: number;
    private elevatorCallButton: ElevatorButton;
    private blackLine: Line;
    private floorSpace: FloorSpace;
    private arrivalDisplay: ArrivalDisplay;
    private settings: Settings;

    constructor(Parent: Building, floorNumber: number) {
        this.parent = Parent;
        this.settings = Settings.getInstance();
        this.FloorNumber = floorNumber;
        this.arrivalDisplay = Factory.getInstance().create("ArrivalDisplay", this)
        this.elevatorCallButton = Factory.getInstance().create("ElevatorButton", this);
        this.blackLine = Factory.getInstance().create("Line", null);
        this.floorSpace = Factory.getInstance().create("FloorSpace", null);
    }
    get floorNumber(): number {
        return this.FloorNumber;
    }

    get singleFloor(): HTMLDivElement {
        return this.SingleFloor;
    }

    setDisplay = (time: number): void => {
        this.arrivalDisplay.setTime(time);
    }

    getOrder = (): void => {
        const display: number | false = this.parent.getOrder(this.FloorNumber, this.freeButton);

        if (display || display === 0) {
            this.setDisplay(display);
            this.elevatorCallButton.lockButton();
        }
    }

    freeButton = (): void => {
        this.elevatorCallButton.freeButton();
    }



    appendToParent = (parent: HTMLElement): void => {
        // Append elements to the singleFloor container
        this.blackLine.appendToParent(this.singleFloor);
        this.floorSpace.appendToParent(this.singleFloor);
        this.elevatorCallButton.appendToParent(this.floorSpace.floorSpace); // Append button to floorSpace
        this.arrivalDisplay.appendToParent(this.floorSpace.floorSpace); // Append display to floorSpace

        // Append singleFloor container to the specified parent element
        parent.appendChild(this.singleFloor);
    }
}

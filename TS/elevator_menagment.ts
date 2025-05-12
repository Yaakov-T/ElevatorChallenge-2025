class ElevatorMenagment {
    private ElevatorsArea: HTMLDivElement;
    private elevators: Elevator[];

    constructor() {
        this.elevators = [];
        for (let i = 0; i < Settings.getInstance().numElevators; i++) {
            this.elevators.push(new Elevator((115 * i + 8)));
        }
        this.ElevatorsArea = document.createElement('div');
        this.ElevatorsArea.classList.add("rowFlex");
        this.ElevatorsArea.style.width =`${Settings.getInstance().numElevators*130}px`
    }

    get elevatorsArea(): HTMLDivElement {
        return this.ElevatorsArea;
    }
    
    getOrder = (floor: number, onArrival: () => void): number | false => {
        let minTime: number = this.elevators[0].checkTimeWithFloor(floor);
        let elevatorIndex = 0;
    
        for (let i = 1; i < this.elevators.length; ++i) {
            if (this.elevators[i].including(floor)) {
                return false;
            }
    
            const time: number = this.elevators[i].checkTimeWithFloor(floor);
            if (time < minTime) {
                minTime = time;
                elevatorIndex = i;
            }
        }
    
        return this.elevators[elevatorIndex].addNewFloor(floor, onArrival);
    }
    

    appendToParent = (parent: HTMLElement): void => {
        this.elevators.forEach((elevator, i) => {
            elevator.appendToParent(this.elevatorsArea);
        });
        parent.appendChild(this.elevatorsArea);
    }


}
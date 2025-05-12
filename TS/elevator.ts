type Destination = {
    floor: number;
    onArrival: () => void;
};

class Elevator {
    private elevatorElement: HTMLImageElement;
    private audioElement: HTMLAudioElement;
    private destinationQueue: Destination[] = [];
    private currentFloor: number = 0;
    private xPosition: number = 0;
    private isRunning: boolean = false;

    constructor(yPosition: number) {
        const settings = Settings.getInstance();
        this.audioElement = new Audio(settings.audio);
        this.elevatorElement = this.createElevator(yPosition, settings.elevator);
    }

    private createElevator(y: number, src: string): HTMLImageElement {
        const el = document.createElement('img');
        el.src = src;
        el.classList.add('elevatorStyle');
        el.style.height = "110px";
        el.style.width = "110px";
        el.style.bottom = `0px`;
        el.style.left = `${y}px`;
        el.style.position = 'absolute';
        return el;
    }

    appendToParent(parent: HTMLElement): void {
        parent.appendChild(this.elevatorElement);
    }

    including(floor: number): boolean {
        return this.destinationQueue.some(dest => dest.floor === floor);
    }

    addNewFloor(floor: number, onArrival: () => void): number {
        if (!this.including(floor)) {
            const estimatedArrivalTime = this.calculateArrivalTime(floor);
            this.destinationQueue.push({ floor, onArrival });

            if (!this.isRunning) {
                this.move(); 
            }

            return estimatedArrivalTime;
        }

        return -1; // כבר בתור
    }

    checkTimeWithFloor(floor: number): number {
        if (this.including(floor)) {
            return -1;
        }
        return this.calculateArrivalTime(floor);
    }

    private calculateArrivalTime(floor: number): number {
        let time = 0;
        let lastFloor = this.currentFloor;

        for (const { floor: queuedFloor } of this.destinationQueue) {
            time += Math.abs(queuedFloor - lastFloor) * 0.5;
            time += Settings.getInstance().secondsToStay;
            lastFloor = queuedFloor;
        }

        time += Math.abs(floor - lastFloor) * 0.5;
        return time;
    }

    private async move(): Promise<void> {
        this.isRunning = true;

        while (this.destinationQueue.length > 0) {
            const { floor: nextFloor, onArrival } = this.destinationQueue.shift()!;
            const floorsToMove = Math.abs(this.currentFloor - nextFloor);
            const seconds = floorsToMove * 0.5;
            const targetPosition = nextFloor * 120;

            this.elevatorElement.style.transition = `bottom ${seconds}s linear`;
            this.elevatorElement.style.bottom = `${targetPosition}px`;

            await this.wait(seconds * 1000);

            this.currentFloor = nextFloor;
            this.xPosition = targetPosition;

            await this.openDoor();

            onArrival(); // ← כאן קוראים לפונקציה שהגיעה מהמזמין

            this.closeDoor();
        }

        this.isRunning = false;
    }

    private async openDoor(): Promise<void> {
        this.audioElement.play();
        const secondsToWait = Settings.getInstance().secondsToStay;
        await this.wait(secondsToWait * 1000);
    }

    private closeDoor(): void {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

import { ElevatorView } from './ElevatorView.js';
import { Settings } from './settings.js';

type Destination = {
    floor: number;
    onArrival: () => void;
};

export class ElevatorLogic {
    private queue: Destination[] = [];
    private currentFloor = 0;
    private isRunning = false;
    private arrivalCountdown = 0;
    private doorCountdown = 0;
    private countdownInterval: number | null = null;

    constructor(private view: ElevatorView) {}

    addNewFloor(floor: number, onArrival: () => void): number {
        if (!this.queue.some(dest => dest.floor === floor)) {
            const est = this.calculateArrivalTime(floor);
            this.queue.push({ floor, onArrival });
            if (!this.isRunning) this.move();
            return est;
        }
        return -1;
    }

    includes(floor: number): boolean {
        return this.queue.some(dest => dest.floor === floor);
    }

    checkTimeWithFloor(floor: number): number {
        return this.calculateArrivalTime(floor);
    }

    private calculateArrivalTime(floor: number): number {
        const settings = Settings.getInstance();
        let time = this.doorCountdown + this.arrivalCountdown;
        let lastFloor = this.currentFloor;

        for (const { floor: qf } of this.queue) {
            time += Math.abs(qf - lastFloor) * 0.5;
            time += settings.secondsToStay;
            lastFloor = qf;
        }

        time += Math.abs(floor - lastFloor) * 0.5;
        return time;
    }

    private async move(): Promise<void> {
        this.isRunning = true;
        const settings = Settings.getInstance();

        while (this.queue.length > 0) {
            const { floor, onArrival } = this.queue.shift()!;
            const delta = Math.abs(floor - this.currentFloor);
            const seconds = delta * 0.5;
            const y = floor * 120;

            this.arrivalCountdown = seconds;
            this.startCountdown();

            await this.view.moveTo(y, seconds);

            this.stopCountdown();
            this.arrivalCountdown = 0;

            this.currentFloor = floor;

            this.view.playDing();
            this.doorCountdown = settings.secondsToStay;
            this.startCountdown();

            await this.wait(settings.secondsToStay * 1000);

            this.view.stopDing();
            this.doorCountdown = 0;

            onArrival();
        }

        this.isRunning = false;
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private startCountdown() {
        if (this.countdownInterval) return;
        this.countdownInterval = setInterval(() => {
            if (this.arrivalCountdown > 0) this.arrivalCountdown -= 0.5;
            if (this.doorCountdown > 0) this.doorCountdown -= 0.5;
            if (this.arrivalCountdown <= 0 && this.doorCountdown <= 0) {
                this.stopCountdown();
            }
        }, 500);
    }

    private stopCountdown() {
        if (this.countdownInterval !== null) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    get timeToNextStop(): number {
        return this.arrivalCountdown + this.doorCountdown;
    }
}

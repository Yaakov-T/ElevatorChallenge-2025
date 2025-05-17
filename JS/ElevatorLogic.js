var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Settings } from './settings.js';
export class ElevatorLogic {
    constructor(view) {
        this.view = view;
        this.queue = [];
        this.currentFloor = 0;
        this.isRunning = false;
        this.arrivalCountdown = 0;
        this.doorCountdown = 0;
        this.countdownInterval = null;
    }
    addNewFloor(floor, onArrival) {
        if (!this.queue.some(dest => dest.floor === floor)) {
            const est = this.calculateArrivalTime(floor);
            this.queue.push({ floor, onArrival });
            if (!this.isRunning)
                this.move();
            return est;
        }
        return -1;
    }
    includes(floor) {
        return this.queue.some(dest => dest.floor === floor);
    }
    checkTimeWithFloor(floor) {
        return this.calculateArrivalTime(floor);
    }
    calculateArrivalTime(floor) {
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
    move() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isRunning = true;
            const settings = Settings.getInstance();
            while (this.queue.length > 0) {
                const { floor, onArrival } = this.queue.shift();
                const delta = Math.abs(floor - this.currentFloor);
                const seconds = delta * 0.5;
                const y = floor * 120;
                this.arrivalCountdown = seconds;
                this.startCountdown();
                yield this.view.moveTo(y, seconds);
                this.stopCountdown();
                this.arrivalCountdown = 0;
                this.currentFloor = floor;
                this.view.playDing();
                this.doorCountdown = settings.secondsToStay;
                this.startCountdown();
                yield this.wait(settings.secondsToStay * 1000);
                this.view.stopDing();
                this.doorCountdown = 0;
                onArrival();
            }
            this.isRunning = false;
        });
    }
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    startCountdown() {
        if (this.countdownInterval)
            return;
        this.countdownInterval = setInterval(() => {
            if (this.arrivalCountdown > 0)
                this.arrivalCountdown -= 0.5;
            if (this.doorCountdown > 0)
                this.doorCountdown -= 0.5;
            if (this.arrivalCountdown <= 0 && this.doorCountdown <= 0) {
                this.stopCountdown();
            }
        }, 500);
    }
    stopCountdown() {
        if (this.countdownInterval !== null) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }
    get timeToNextStop() {
        return this.arrivalCountdown + this.doorCountdown;
    }
}

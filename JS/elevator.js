"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Elevator {
    constructor(yPosition) {
        this.destinationQueue = [];
        this.currentFloor = 0;
        this.xPosition = 0;
        this.isRunning = false;
        const settings = Settings.getInstance();
        this.audioElement = new Audio(settings.audio);
        this.elevatorElement = this.createElevator(yPosition, settings.elevator);
    }
    createElevator(y, src) {
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
    appendToParent(parent) {
        parent.appendChild(this.elevatorElement);
    }
    including(floor) {
        return this.destinationQueue.includes(floor);
    }
    addNewFloor(floor) {
        if (!this.including(floor)) {
            const estimatedArrivalTime = this.calculateArrivalTime(floor);
            this.destinationQueue.push(floor);
            if (!this.isRunning) {
                this.move(); // מתחיל תנועה אם לא רצה כבר
            }
            return estimatedArrivalTime;
        }
        return -1; // כבר בתור
    }
    checkTimeWithFloor(floor) {
        if (this.including(floor)) {
            return -1;
        }
        return this.calculateArrivalTime(floor);
    }
    calculateArrivalTime(floor) {
        let time = 0;
        let lastFloor = this.currentFloor;
        for (const queuedFloor of this.destinationQueue) {
            time += Math.abs(queuedFloor - lastFloor) * 0.5;
            time += Settings.getInstance().secondsToStay;
            lastFloor = queuedFloor;
        }
        time += Math.abs(floor - lastFloor) * 0.5;
        return time;
    }
    move() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isRunning = true;
            while (this.destinationQueue.length > 0) {
                const nextFloor = this.destinationQueue.shift();
                const floorsToMove = Math.abs(this.currentFloor - nextFloor);
                const seconds = floorsToMove * 0.5;
                const targetPosition = nextFloor * 120;
                this.elevatorElement.style.transition = `bottom ${seconds}s linear`;
                this.elevatorElement.style.bottom = `${targetPosition}px`;
                yield this.wait(seconds * 1000);
                this.currentFloor = nextFloor;
                this.xPosition = targetPosition;
                yield this.openDoor();
                this.closeDoor();
            }
            this.isRunning = false;
        });
    }
    openDoor() {
        return __awaiter(this, void 0, void 0, function* () {
            this.audioElement.play();
            const secondsToWait = Settings.getInstance().secondsToStay;
            yield this.wait(secondsToWait * 1000);
        });
    }
    closeDoor() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

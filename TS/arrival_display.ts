import { SingleFloor } from './singleFloor.js';

export class ArrivalDisplay {
    private container: HTMLDivElement;
    private textElement: HTMLParagraphElement;
    private waitTime: number = 0;
    private parent: SingleFloor;
    private intervalId: ReturnType<typeof setInterval>;

    constructor(parent: SingleFloor) {
        this.parent = parent;

        this.container = document.createElement("div");
        this.container.classList.add("ArrivalDisplay");

        this.textElement = document.createElement("p");
        this.container.appendChild(this.textElement);

        this.updateDisplay();

        this.intervalId = setInterval(() => this.reduceTime(), 500);
    }

    setTime(time: number): void {
        this.waitTime = time;
    }

    private updateDisplay(): void {
        this.textElement.textContent = this.waitTime.toString();
    }

    private reduceTime(): void {
        this.waitTime -= 0.5;

        if (this.waitTime >= 0) {
            this.updateDisplay();
        }

        if (this.waitTime === -2) {
            this.parent.freeButton();
        }
    }

    appendToParent(parent: HTMLElement): void {
        parent.appendChild(this.container);
    }
}

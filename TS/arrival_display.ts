class ArrivalDisplay {
    private display: HTMLDivElement;
    private timeText: HTMLParagraphElement;
    private waiteTime: number = 0;
    private parent: SingleFloor;
    private intervalId: ReturnType<typeof setInterval>;

    constructor(parent: SingleFloor) {
        this.parent = parent;

        this.display = document.createElement("div");
        this.display.classList.add("ArrivalDisplay");

        this.timeText = document.createElement("p");
        this.display.appendChild(this.timeText);

        this.updateDisplay(); 

        this.intervalId = setInterval(() => {
            this.reduceTime();
        }, 500);
    }

    setTime = (time: number): void => {
        this.waiteTime = time +0.5;
    }

    private updateDisplay = (): void => {
        this.timeText.textContent = this.waiteTime.toString();
    }

    private reduceTime = (): void => {
        this.waiteTime -= 0.5;

        if (this.waiteTime >= 0) {
            this.updateDisplay();
        }

        if (this.waiteTime === -1.5) {
            this.parent.freeButton();
        }
    }

    appendToParent = (parent: HTMLElement): void => {
        parent.appendChild(this.display);
    }
}

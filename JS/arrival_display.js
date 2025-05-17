export class ArrivalDisplay {
    constructor(parent) {
        this.waitTime = 0;
        this.parent = parent;
        this.container = document.createElement("div");
        this.container.classList.add("ArrivalDisplay");
        this.textElement = document.createElement("p");
        this.container.appendChild(this.textElement);
        this.updateDisplay();
        this.intervalId = setInterval(() => this.reduceTime(), 500);
    }
    setTime(time) {
        this.waitTime = time;
    }
    updateDisplay() {
        this.textElement.textContent = this.waitTime.toString();
    }
    reduceTime() {
        this.waitTime -= 0.5;
        if (this.waitTime >= 0) {
            this.updateDisplay();
        }
        if (this.waitTime === -2) {
            this.parent.freeButton();
        }
    }
    appendToParent(parent) {
        parent.appendChild(this.container);
    }
}

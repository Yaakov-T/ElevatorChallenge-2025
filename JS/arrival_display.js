"use strict";
class ArrivalDisplay {
    constructor(parent) {
        this.waiteTime = 0;
        this.setTime = (time) => {
            this.waiteTime = time + 0.5;
        };
        this.updateDisplay = () => {
            this.timeText.textContent = this.waiteTime.toString();
        };
        this.reduceTime = () => {
            this.waiteTime -= 0.5;
            if (this.waiteTime >= 0) {
                this.updateDisplay();
            }
            if (this.waiteTime === -1.5) {
                this.parent.freeButton();
            }
        };
        this.appendToParent = (parent) => {
            parent.appendChild(this.display);
        };
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
}

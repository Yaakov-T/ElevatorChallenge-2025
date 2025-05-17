var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ElevatorView {
    constructor(x, imageSrc, audioSrc) {
        this.elevatorElement = document.createElement('img');
        this.elevatorElement.src = imageSrc;
        this.elevatorElement.classList.add('elevatorStyle');
        this.elevatorElement.style.height = "110px";
        this.elevatorElement.style.width = "110px";
        this.elevatorElement.style.bottom = `0px`;
        this.elevatorElement.style.left = `${x}px`;
        this.elevatorElement.style.position = 'absolute';
        this.audioElement = new Audio(audioSrc);
    }
    appendTo(parent) {
        parent.appendChild(this.elevatorElement);
    }
    moveTo(targetY, durationSec) {
        return __awaiter(this, void 0, void 0, function* () {
            this.elevatorElement.style.transition = `bottom ${durationSec}s linear`;
            this.elevatorElement.style.bottom = `${targetY}px`;
            return new Promise(resolve => setTimeout(resolve, durationSec * 1000));
        });
    }
    playDing() {
        this.audioElement.play();
    }
    stopDing() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
}

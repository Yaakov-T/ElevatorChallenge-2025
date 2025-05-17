export class ElevatorView {
    private elevatorElement: HTMLImageElement;
    private audioElement: HTMLAudioElement;

    constructor(x: number, imageSrc: string, audioSrc: string) {
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

    appendTo(parent: HTMLElement) {
        parent.appendChild(this.elevatorElement);
    }

    async moveTo(targetY: number, durationSec: number): Promise<void> {
        this.elevatorElement.style.transition = `bottom ${durationSec}s linear`;
        this.elevatorElement.style.bottom = `${targetY}px`;
        return new Promise(resolve => setTimeout(resolve, durationSec * 1000));
    }

    playDing(): void {
        this.audioElement.play();
    }

    stopDing(): void {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
}

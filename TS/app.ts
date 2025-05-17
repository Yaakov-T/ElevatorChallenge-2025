import { Settings } from './settings.js';
import { Factory } from './factory.js';
import { BuildingsSystem } from './buildingsSystem.js';

let system: BuildingsSystem;
let sett: Settings = Settings.getInstance();

const DOMElementStyle = (DOMElement: HTMLElement): void => {
    DOMElement.classList.add("DOMElementStyle");
    DOMElement.style.minWidth = `100%`;
};

const init = (): void => {
    const DOMElement = document.getElementById("DOMElement");
    const allBuildingsErea = document.createElement("div");

    if (DOMElement) {
        DOMElementStyle(DOMElement);
        DOMElement.appendChild(allBuildingsErea);
        allBuildingsErea.classList.add("allBuildingErea");
    }

    system = Factory.getInstance().create("CreateSystem", allBuildingsErea);
};

init();

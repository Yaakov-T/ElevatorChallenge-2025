"use strict";
let system;
let sett = Settings.getInstance();
const DOMElementStyle = (DOMElement) => {
    DOMElement.classList.add("DOMElementStyle");
    DOMElement.style.minWidth = `100%`;
};
const init = () => {
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

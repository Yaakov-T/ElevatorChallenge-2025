class BuildingsSystem {
    private buildingArr: Building[];

    constructor(buildingErea: HTMLDivElement) {
        this.buildingArr = [];
        this.createBuildings();
        this.appendToParent(buildingErea);
    }
    
    private createBuildings = () => {
        for (let i = 0; i < Settings.getInstance().numBuildings; i++) {
            this.buildingArr.push(Factory.getInstance().create( "Building",null));
        }
    }

    private appendToParent = (parent: HTMLElement): void  =>{
        this.buildingArr.forEach((building) => {
            building.appendToParent(parent);
        });
    }

}

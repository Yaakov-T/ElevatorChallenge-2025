import { Building } from './building.js';
import { ElevatorMenagment } from './elevator_menagment.js';
import { FloorSpace } from './floor_space.js';
import { Line } from './line.js';
import { ArrivalDisplay } from './arrival_display.js';
import { Elevator } from './elevator.js';
import { ElevatorButton } from './elevator_button.js';
import { BuildingsSystem } from './buildingsSystem.js';
import { SingleFloor } from './singleFloor.js';

export class Factory {
    private static instance: Factory | null = null;

    private constructor() {}

    static getInstance = (): Factory => {
        if (!Factory.instance) {
            Factory.instance = new Factory();
        }
        return Factory.instance;
    };

    create = (className: string, parameter: any): any => {
        if (parameter === null) {
            switch (className) {
                case 'Building':
                    return new Building();
                case 'ElevatorMenagment':
                    return new ElevatorMenagment();
                case 'FloorSpace':
                    return new FloorSpace();
                case 'Line':
                    return new Line();
                default:
                    throw new Error('Invalid class name provided.');
            }
        } else if (className === 'ArrivalDisplay' && parameter instanceof SingleFloor) {
            return new ArrivalDisplay(parameter);
        } else if (className === 'Elevator' && typeof parameter === 'number') {
            return new Elevator(parameter);
        } else if (className === 'ElevatorButton' && parameter instanceof SingleFloor) {
            return new ElevatorButton(parameter);
        } else if (className === 'CreateSystem' && parameter instanceof HTMLDivElement) {
            return new BuildingsSystem(parameter);
        } else if ((className === 'SingleFloor' && parameter instanceof Array) && parameter.length === 2) {
            const [buildingInstance, numberParam] = parameter;
            return new SingleFloor(buildingInstance, numberParam);
        } else {
            throw new Error('Invalid class name provided.');
        }
    };
}

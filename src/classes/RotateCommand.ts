import { Command } from "./Command";

export interface IRotable {
  getDirection: () => number;
  getAngularVelocity: () => number;
  getDirectionsNumber: () => number;

  setDirection: (value: number) => void;
}

export class RotateCommand extends Command {
  rotable: IRotable;

  constructor(rotable: IRotable) {
    super();
    this.rotable = rotable;
  }

  public execute() {
    let direction = this.rotable.getDirection();
    let angularVelocity = this.rotable.getAngularVelocity();
    let directionsNumber = this.rotable.getDirectionsNumber();

    if (!direction || typeof direction !== "number") {
      throw new Error(
        "Попытка повернуть объект, у которого невозможно прочитать направление"
      );
    }

    if (!angularVelocity || typeof angularVelocity !== "number") {
      throw new Error(
        "Попытка повернуть объект, у которого невозможно прочитать угловую скорость"
      );
    }

    if (!directionsNumber || typeof directionsNumber !== "number") {
      throw new Error(
        "Попытка повернуть объект, у которого невозможно прочитать количество повоторот"
      );
    }

    this.rotable.setDirection(
      (this.rotable.getDirection() + this.rotable.getAngularVelocity()) %
        this.rotable.getDirectionsNumber()
    );
  }
}

export interface IRotable {
  getDirection: () => number;
  getAngularVelocity: () => number;
  getDirectionsNumber: () => number;

  setDirection: (direction: number) => void;
}

export class RotateCommand {
  rotable: IRotable;

  constructor(rotable: IRotable) {
    this.rotable = rotable;
  }

  public execute() {
    const direction = this.rotable.getDirection();
    const angularVelocity = this.rotable.getAngularVelocity();
    const directionsNumber = this.rotable.getDirectionsNumber();

    if (!direction || typeof direction !== "number") {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать направление"
      );
    }

    if (!angularVelocity || typeof angularVelocity !== "number") {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать угловую скорость"
      );
    }

    if (!directionsNumber || typeof directionsNumber !== "number") {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать количество повоторот"
      );
    }

    this.rotable.setDirection(
      (this.rotable.getDirection() + this.rotable.getAngularVelocity()) %
        this.rotable.getDirectionsNumber()
    );
  }
}

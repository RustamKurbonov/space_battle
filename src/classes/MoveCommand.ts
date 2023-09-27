import { Vector } from "../interfaces";

export interface IMovable {
  getPosition: () => Vector;
  getVelocity: () => Vector;

  setPosition: (value: Vector) => void;
}

export class MoveCommand {
  movable: IMovable;

  constructor(movable: IMovable) {
    this.movable = movable;
  }

  public execute() {
    const position = this.movable.getPosition();
    const velocity = this.movable.getVelocity();

    if (position && (!position?.x || !position?.y)) {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать положение в пространстве"
      );
    }

    if (velocity && (!velocity?.x || !velocity?.y)) {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости"
      );
    }

    this.movable.setPosition({
      x: position.x + velocity.x,
      y: position.y + velocity.y,
    });
  }
}

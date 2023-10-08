import { Vector } from "../interfaces";
import { Command } from "./Command";

export interface IMovable {
  getPosition: () => Vector;
  getVelocity: () => Vector;

  setPosition: (value: Vector) => void;
}

export class MoveCommand extends Command {
  movable: IMovable;

  constructor(movable: IMovable) {
    super();
    this.movable = movable;
  }

  public execute() {
    let position = this.movable.getPosition();
    let velocity = this.movable.getVelocity();

    if (!position || !position?.x || !position?.y) {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно прочитать положение в пространстве"
      );
    }

    if (!velocity || !velocity?.x || !velocity?.y) {
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

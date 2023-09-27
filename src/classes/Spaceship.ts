import { FULL_TURN } from "../constants";
import { Vector } from "../interfaces";
import { MoveCommand } from "./MoveCommand";
import { RotateCommand } from "./RotateCommand";
import { UObject } from "./UObject";

export class Spaceship {
  object: UObject;

  constructor({
    position,
    direction,
  }: {
    position: Vector;
    direction: number;
  }) {
    this.object = new UObject({
      position,
      direction,
      directionsNumber: 8,
      velocity: { x: -7, y: 3 },
      angularVelocity: 2,
    });
  }

  public move() {
    let position = this.object.getProperty("position") as Vector;
    let velocity = this.object.getProperty("velocity") as Vector;

    new MoveCommand({
      getPosition() {
        return position;
      },
      getVelocity() {
        return velocity;
      },
      setPosition(value) {
        position = value;
      },
    }).execute();

    this.setPosition({ position });
  }

  public rotate() {
    let currnetDirection = this.object.getProperty("direction") as number;
    let angularVelocity = this.object.getProperty("angularVelocity") as number;
    let directionsNumber = this.object.getProperty(
      "directionsNumber"
    ) as number;

    new RotateCommand({
      getAngularVelocity() {
        return angularVelocity;
      },
      getDirection() {
        return currnetDirection;
      },
      getDirectionsNumber() {
        return directionsNumber;
      },
      setDirection(direction) {
        currnetDirection = direction;
      },
    }).execute();

    this.setPosition({ direction: currnetDirection });
  }

  private setPosition({
    position,
    direction,
  }: {
    position?: Vector;
    direction?: number;
  }): void {
    const propertyPosition = this.object.getProperty("position") as Vector;
    const directionPosition = this.object.getProperty("direction") as number;

    if (propertyPosition && (!propertyPosition?.x || !propertyPosition?.y)) {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно изменить положение в пространстве"
      );
    }

    if (!directionPosition || typeof directionPosition !== "number") {
      throw new Error(
        "Попытка сдвинуть объект, у которого невозможно изменить положение в пространстве"
      );
    }

    this.object.setProperty("position", {
      x: Math.round(
        position?.x ||
          (this.object.getProperty("position") as Vector).x +
            (this.object.getProperty("angularVelocity") as number) *
              Math.cos(
                (FULL_TURN /
                  (this.object.getProperty("directionsNumber") as number)) *
                  (direction ||
                    (this.object.getProperty("direction") as number))
              )
      ),
      y: Math.round(
        position?.y ||
          (this.object.getProperty("position") as Vector).y +
            (this.object.getProperty("angularVelocity") as number) *
              Math.sin(
                (FULL_TURN /
                  (this.object.getProperty("directionsNumber") as number)) *
                  (direction ||
                    (this.object.getProperty("direction") as number))
              )
      ),
    });
  }

  public getPosition(): Vector {
    return this.object.getProperty("position") as Vector;
  }
}

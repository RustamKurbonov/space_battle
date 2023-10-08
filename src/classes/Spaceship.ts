import { FULL_TURN } from "../constants";
import { Vector } from "../interfaces";
import { BurnFuelCommand } from "./BurnFuelCommand";
import { CheckFuelCommand } from "./CheckFuelCommand";
import { MacroCommand } from "./MacroCommand";
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
      fuel: 20,
      directionsNumber: 8,
      velocity: { x: -7, y: 3 },
      angularVelocity: 2,
    });
  }

  public move() {
    let position = this.object.getProperty("position") as Vector;
    let velocity = this.object.getProperty("velocity") as Vector;
    let fuel = this.object.getProperty("fuel") as number;

    new MacroCommand([
      new CheckFuelCommand({
        getFuel() {
          return fuel;
        },
        getVelocity() {
          return Math.abs(velocity.x) + Math.abs(velocity.y);
        },
      }),
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
      }),
      new BurnFuelCommand({
        getFuel() {
          return fuel;
        },
        getVelocity() {
          return Math.abs(velocity.x) + Math.abs(velocity.y);
        },
        setFuel(value) {
          fuel = value;
        },
      }),
    ]).execute();

    this.setData({ position, fuel });
  }

  public rotate() {
    let direction = this.object.getProperty("direction") as number;
    let angularVelocity = this.object.getProperty("angularVelocity") as number;
    let fuel = this.object.getProperty("fuel") as number;
    let directionsNumber = this.object.getProperty(
      "directionsNumber"
    ) as number;

    new MacroCommand([
      new CheckFuelCommand({
        getFuel() {
          return fuel;
        },
        getVelocity() {
          return angularVelocity;
        },
      }),
      new RotateCommand({
        getAngularVelocity() {
          return angularVelocity;
        },
        getDirection() {
          return direction;
        },
        getDirectionsNumber() {
          return directionsNumber;
        },
        setDirection(value) {
          direction = value;
        },
      }),
      new BurnFuelCommand({
        getFuel() {
          return fuel;
        },
        getVelocity() {
          return angularVelocity;
        },
        setFuel(value) {
          fuel = value;
        },
      }),
    ]).execute();

    this.setData({ direction, fuel });
  }

  private setData({
    position,
    direction,
    fuel,
  }: {
    position?: Vector;
    direction?: number;
    fuel: number;
  }): void {
    let propertyPosition = this.object.getProperty("position") as Vector;
    let directionPosition = this.object.getProperty("direction") as number;
    let angularVelocity = this.object.getProperty("angularVelocity") as number;
    let directionsNumber = this.object.getProperty(
      "directionsNumber"
    ) as number;

    this.object.setProperty("position", {
      x: Math.round(
        position?.x ||
          propertyPosition.x +
            angularVelocity *
              Math.cos(
                (FULL_TURN / directionsNumber) *
                  (direction || directionPosition)
              )
      ),
      y: Math.round(
        position?.y ||
          propertyPosition.y +
            angularVelocity *
              Math.sin(
                (FULL_TURN / directionsNumber) *
                  (direction || directionPosition)
              )
      ),
    });

    this.object.setProperty("fuel", fuel);
  }

  public getData(): UObject {
    return this.object;
  }
}

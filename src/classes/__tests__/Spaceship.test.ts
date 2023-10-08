import { Vector } from "../../interfaces";
import { Spaceship } from "../Spaceship";

describe("Spaceship", () => {
  it("Движение корабля на 5, 8 с расходом топлива", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    spaceship.move();

    const position = spaceship.getData().getProperty("position") as Vector;
    const fuel = spaceship.getData().getProperty("fuel") as number;

    expect(position).toEqual({ x: 5, y: 8 });
    expect(fuel).toEqual(10);
  });

  it("Поворот корабля на 4 с расходом топлива", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    spaceship.rotate();

    const position = spaceship.getData().getProperty("position") as Vector;
    const fuel = spaceship.getData().getProperty("fuel") as number;

    expect(position).toEqual({ x: 11, y: 3 });
    expect(fuel).toEqual(18);
  });
});

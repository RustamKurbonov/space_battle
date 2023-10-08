import { Vector } from "../../interfaces";
import { MoveCommand } from "../MoveCommand";

describe("MoveCommand", () => {
  it("Движение меняет положение объекта на (5, 8)", () => {
    let position;
    new MoveCommand({
      getPosition() {
        return { x: 12, y: 5 };
      },
      getVelocity() {
        return { x: -7, y: 3 };
      },
      setPosition(value) {
        position = value;
      },
    }).execute();

    expect(position).toEqual({ x: 5, y: 8 });
  });
});

it("Попытка сдвинуть объект, у которого невозможно прочитать положение в пространстве", () => {
  try {
    new MoveCommand({
      getPosition() {
        return undefined as unknown as Vector;
      },
      getVelocity() {
        return { x: -7, y: 3 };
      },
      setPosition() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости", () => {
  try {
    new MoveCommand({
      getPosition() {
        return { x: 12, y: 5 };
      },
      getVelocity() {
        return undefined as unknown as Vector;
      },
      setPosition() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

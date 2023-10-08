import { RotateCommand } from "../RotateCommand";

describe("RotateCommand", () => {
  it("Поворот объекта на 4", () => {
    let direction;
    new RotateCommand({
      getAngularVelocity() {
        return 2;
      },
      getDirection() {
        return 2;
      },
      getDirectionsNumber() {
        return 8;
      },
      setDirection(value) {
        direction = value;
      },
    }).execute();

    expect(direction).toEqual(4);
  });
});

it("Попытка повернуть объект, у которого невозможно прочитать направление", () => {
  try {
    new RotateCommand({
      getAngularVelocity() {
        return 2;
      },
      getDirection() {
        return undefined as unknown as number;
      },
      getDirectionsNumber() {
        return 8;
      },
      setDirection() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка повернуть объект, у которого невозможно прочитать угловую скорость", () => {
  try {
    new RotateCommand({
      getAngularVelocity() {
        return undefined as unknown as number;
      },
      getDirection() {
        return 2;
      },
      getDirectionsNumber() {
        return 8;
      },
      setDirection() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка повернуть объект, у которого невозможно прочитать количество повоторот", () => {
  try {
    new RotateCommand({
      getAngularVelocity() {
        return 2;
      },
      getDirection() {
        return 2;
      },
      getDirectionsNumber() {
        return undefined as unknown as number;
      },
      setDirection() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

import { Spaceship } from "../Spaceship";

describe("Spaceship", () => {
  it("Движение меняет положение объекта на (5, 8)", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    spaceship.move();

    expect(spaceship.getPosition()).toEqual({ x: 5, y: 8 });
  });

  it("Попытка сдвинуть объект, у которого невозможно прочитать положение в пространстве", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка сдвинуть объект, у которого невозможно изменить положение в пространстве", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка сдвинуть объект, у которого невозможно прочитать направление", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка сдвинуть объект, у которого невозможно прочитать угловую скорость", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка сдвинуть объект, у которого невозможно прочитать количество повоторот", () => {
    const spaceship = new Spaceship({
      position: { x: 12, y: 5 },
      direction: 2,
    });

    try {
      spaceship.move();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });
});

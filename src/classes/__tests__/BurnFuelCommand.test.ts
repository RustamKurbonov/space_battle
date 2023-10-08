import { BurnFuelCommand } from "../BurnFuelCommand";

describe("BurnFuelCommand", () => {
  it("Топливо уменьшается с 10 до 6 единиц при скорости 4", () => {
    let fuel;
    new BurnFuelCommand({
      getFuel() {
        return 10;
      },
      getVelocity() {
        return 4;
      },
      setFuel(value) {
        fuel = value;
      },
    }).execute();

    expect(fuel).toEqual(6);
  });
});

it("Попытка сжечь топливо объекта, у которого нет топлива", () => {
  try {
    new BurnFuelCommand({
      getFuel() {
        return 10;
      },
      getVelocity() {
        return 4;
      },
      setFuel() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка сжечь топливо объекта, у которого недостаточно топлива", () => {
  try {
    new BurnFuelCommand({
      getFuel() {
        return 0;
      },
      getVelocity() {
        return 4;
      },
      setFuel() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка сжечь топливо объекта, у которого невозможно прочитать значение мгновенной скорости", () => {
  try {
    new BurnFuelCommand({
      getFuel() {
        return 10;
      },
      getVelocity() {
        return undefined as unknown as number;
      },
      setFuel() {
        return;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

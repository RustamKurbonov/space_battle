import { CheckFuelCommand } from "../CheckFuelCommand";

describe("CheckFuelCommand", () => {
  it("У объекта достаточно топлива", () => {
    try {
      new CheckFuelCommand({
        getFuel() {
          return 10;
        },
        getVelocity() {
          return 4;
        },
      }).execute();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeNull();
    }
  });
});

it("У объекта недостаточно топлива", () => {
  try {
    new CheckFuelCommand({
      getFuel() {
        return 0;
      },
      getVelocity() {
        return 4;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка проверки топлива объекта, у которого невозможно прочитать значение топлива", () => {
  try {
    new CheckFuelCommand({
      getFuel() {
        return undefined as unknown as number;
      },
      getVelocity() {
        return 4;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

it("Попытка проверки топлива объекта, у которого невозможно прочитать значение мгновенной скорости", () => {
  try {
    new CheckFuelCommand({
      getFuel() {
        return 10;
      },
      getVelocity() {
        return undefined as unknown as number;
      },
    }).execute();
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).not.toBeNull();
  }
});

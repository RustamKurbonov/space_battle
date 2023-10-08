import { Command } from "./Command";

export interface IFuelFacility {
  getFuel: () => number;
  getVelocity: () => number;
}

export class CheckFuelCommand extends Command {
  fuelFacility: IFuelFacility;

  constructor(fuelFacility: IFuelFacility) {
    super();
    this.fuelFacility = fuelFacility;
  }

  public execute() {
    let fuel = this.fuelFacility.getFuel();
    let velocity = this.fuelFacility.getVelocity();

    if (fuel < velocity) {
      throw new Error("У объекта недостаточно топлива топлива");
    }

    if (!fuel || typeof fuel !== "number") {
      throw new Error(
        "Попытка проверки топлива объекта, у которого невозможно прочитать значение топлива"
      );
    }

    if (!velocity || typeof velocity !== "number") {
      throw new Error(
        "Попытка проверки топлива объекта, у которого невозможно прочитать значение мгновенной скорости"
      );
    }
  }
}

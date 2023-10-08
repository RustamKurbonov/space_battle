import { Command } from "./Command";

interface IBurnFuel {
  getFuel: () => number;
  getVelocity: () => number;
  setFuel: (value: number) => void;
}

export class BurnFuelCommand extends Command {
  fuelFacility: IBurnFuel;

  constructor(fuelFacility: IBurnFuel) {
    super();
    this.fuelFacility = fuelFacility;
  }

  public execute(): void {
    let fuel = this.fuelFacility.getFuel();
    let velocity = this.fuelFacility.getVelocity();

    if (fuel <= 0) {
      throw new Error(
        "Попытка сжечь топливо объекта, у которого недостаточно топлива"
      );
    }

    if (!fuel || typeof fuel !== "number") {
      throw new Error(
        "Попытка сжечь топливо объекта, у которого невозможно прочитать значение топлива"
      );
    }

    if (!velocity || typeof velocity !== "number") {
      throw new Error(
        "Попытка сжечь топливо объекта, у которого невозможно прочитать значение мгновенной скорости"
      );
    }

    this.fuelFacility.setFuel(fuel - velocity);
  }
}

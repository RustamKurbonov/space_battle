import { Command } from "./Command";

export class LoggerCommand extends Command {
  error: string;

  constructor(error: string) {
    super();
    this.error = error;
  }
  public execute(): void {
    if (typeof this.error !== "string") {
      throw new Error("Тип ошибки не равен строке");
    }

    console.error(this.error);
  }
}

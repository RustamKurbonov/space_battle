import { Command } from "./Command";
import { LoggerCommand } from "./LoggerCommand";
import { Queue } from "./Queue";

export class MacroCommand extends Command {
  cmds: Command[];

  constructor(cmds: Command[]) {
    super();
    this.cmds = cmds;
  }

  public execute(): void {
    if (!Array.isArray(this.cmds)) {
      throw new Error("В макро команде может быть только массив команд");
    }

    const queue = new Queue(this.cmds);

    while (!queue.isEmpty()) {
      if (!queue.peek().execute) {
        throw new Error(
          "Попытка вызова метода execute команды, у которой метод отсутствует"
        );
      }

      try {
        queue.peek().execute();
        queue.remove();
      } catch (e) {
        if (typeof e === "string") {
          new LoggerCommand(e.toLocaleUpperCase()).execute();
        } else if (e instanceof Error) {
          new LoggerCommand(e.message).execute();
        }

        queue.injectEmpty();
      }
    }
  }
}

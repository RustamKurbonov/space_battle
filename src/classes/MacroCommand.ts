import { Command } from "./Command";

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

    for (let i = 0; i < this.cmds.length; i++) {
      const cmd = this.cmds[i];

      if (!cmd?.execute) {
        throw new Error(
          "Попытка вызова метода execute команды, у которой метод отсутствует"
        );
      }

      cmd.execute();
    }
  }
}

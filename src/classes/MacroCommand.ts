import { Command } from "./Command";
import { LoggerCommand } from "./LoggerCommand";
import { Queue } from "./Queue";
import { Thread } from "./Thread";

export class MacroCommand extends Command {
  cmds: Command[];

  constructor(cmds: Command[]) {
    super();
    this.cmds = cmds;
  }

  public async execute(): Promise<void> {
    if (!Array.isArray(this.cmds)) {
      throw new Error("В макро команде может быть только массив команд");
    }

    const queue = new Queue(this.cmds);

    const behavior = async () => {
      while (!queue.isEmpty()) {
        if (!queue.peek().execute) {
          throw new Error(
            "Попытка вызова метода execute команды, у которой метод отсутствует"
          );
        }

        const command = queue.peek();

        try {
          command.execute();
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
    };

    const thread = new Thread(queue, behavior);
    await thread.start();
  }
}

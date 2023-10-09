import { Command } from "./Command";

export class Queue {
  queue: Command[] = [];

  constructor(queue: Command[]) {
    this.queue = queue;
  }

  public injectEmpty(): void {
    this.queue = [{} as Command, ...this.queue];
  }

  public isEmpty(): boolean {
    return Boolean(this.queue.length === 0 || !this.queue[0]?.execute);
  }

  public peek(): Command {
    const cmd = this.queue?.[0];

    if (!cmd || !cmd.execute) {
      throw new Error("Попытка вернуть пустую команду");
    }

    return cmd;
  }

  public remove(): void {
    this.queue.shift();
  }
}

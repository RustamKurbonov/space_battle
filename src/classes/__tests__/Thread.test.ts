import { Command } from "../Command";
import { LoggerCommand } from "../LoggerCommand";
import { Queue } from "../Queue";
import { Thread } from "../Thread";

const cmds: Command[] = [
  { execute: () => "one" },
  { execute: () => "two" },
  { execute: () => "three" },
];

describe("Thread", () => {
  it("При вызове очереди флаг isStop=true", async () => {
    const queue = new Queue(cmds);

    const behavior = async () => {
      while (!queue.isEmpty()) {
        const command = queue.peek();

        try {
          command.execute();
          queue.remove();
        } catch (e) {}
      }
    };

    const thread = new Thread(queue, behavior);
    await thread.start();

    expect(thread.isStop).toBe(true);
  });

  it("При вызове stop очередь завершилась", async () => {
    const queue = new Queue(cmds);

    const behavior = async () => {
      while (!queue.isEmpty()) {
        const command = queue.peek();

        try {
          command.execute();
          queue.remove();
        } catch (e) {}
      }
    };

    const thread = new Thread(queue, behavior);
    await thread.start();
    thread.stop();

    expect(thread.isStop).toBe(true);
  });
});

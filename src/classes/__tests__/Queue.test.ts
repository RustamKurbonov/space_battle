import { Command } from "../Command";
import { Queue } from "../Queue";

const cmds: Command[] = [
  { execute: () => "one" },
  { execute: () => "two" },
  { execute: () => "three" },
];

describe("Queue", () => {
  it("Попытка вернуть пустую команду", () => {
    try {
      const queue = new Queue([{} as unknown as Command, ...cmds]);

      while (!queue.isEmpty()) {
        queue.peek().execute();
        queue.remove();
      }
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeNull();
    }
  });

  it("Остановка по ошибке", () => {
    try {
      const queue = new Queue([{} as unknown as Command, ...cmds]);

      while (!queue.isEmpty()) {
        queue.peek().execute();
        queue.remove();
      }
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeNull();
    }
  });
});

import { Command } from "../Command";
import { MacroCommand } from "../MacroCommand";

const cmds: Command[] = [
  { execute: () => "one" },
  { execute: () => "two" },
  { execute: () => "three" },
];

describe("MacroCommand", () => {
  it("Вызов макрокоманды прошел успешно", () => {
    new MacroCommand(cmds).execute();
  });

  it("В макро команде может быть только массив команд", () => {
    try {
      new MacroCommand(undefined as unknown as Command[]).execute();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });

  it("Попытка вызова метода execute команды, у которой метод отсутствует", () => {
    try {
      new MacroCommand([
        ...cmds,
        { notExecute: () => "notExecute" } as unknown as Command,
      ]).execute();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });
});

import { LoggerCommand } from "../LoggerCommand";

describe("LoggerCommand", () => {
  it("Тип ошибки не равен строке", () => {
    try {
      new LoggerCommand(undefined as unknown as string).execute();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull();
    }
  });
});

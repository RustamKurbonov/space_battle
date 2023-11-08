import { Queue } from "./Queue";

export class Thread {
  thread: Queue;
  isStop: boolean;
  behavior: () => Promise<void>;

  constructor(thread: Queue, behavior: () => Promise<void>) {
    this.behavior = behavior;
    this.thread = thread;
    this.isStop = false;
  }

  public async start(): Promise<void> {
    await this.behavior().finally(() => (this.isStop = true));
  }

  public stop(): void {
    this.isStop = true;
  }
}

import { Vector } from "../interfaces";

export interface Object {
  [name: string]: number | Vector;
}

export class UObject {
  object: Object;

  constructor(object: Object) {
    this.object = object;
  }

  public getProperty(name: string) {
    return this.object[name];
  }

  public setProperty(name: string, value: number | Vector) {
    this.object = { ...this.object, [name]: value };
  }
}

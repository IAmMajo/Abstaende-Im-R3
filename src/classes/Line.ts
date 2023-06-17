import type Vector from "./Vector";

export default class Line {
  constructor(readonly base: Vector, readonly direction: Vector) {}
}

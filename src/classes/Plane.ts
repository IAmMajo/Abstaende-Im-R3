import type Vector from "./Vector";

export default class Plane {
  constructor(
    readonly base: Vector,
    readonly direction1: Vector,
    readonly direction2: Vector
  ) {}
}

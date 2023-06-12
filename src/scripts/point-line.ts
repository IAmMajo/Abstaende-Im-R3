import type { Vector } from "./classes";
export function pointLineDistanceCalc(
  pPoint: Vector,
  pBase: Vector,
  pDirection: Vector
): number {
  return (
    pPoint.subtract(pBase).crossProduct(pDirection).magnitude() /
    pDirection.magnitude()
  );
}

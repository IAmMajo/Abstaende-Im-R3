import type { Vector } from "./classes";

export function pointPlaneDistanceCalc(
  pPoint: Vector,
  pPlaneBase: Vector,
  pPlaneDirection1: Vector,
  pPlaneDirection2: Vector
): number {
  const NORMAL = pPlaneDirection1.crossProduct(pPlaneDirection2);
  return (
    Math.abs(pPoint.subtract(pPlaneBase).dotProduct(NORMAL)) /
    NORMAL.magnitude()
  );
}

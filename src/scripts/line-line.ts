import { Vector } from "./classes";
import { pointLineDistanceCalc } from "./point-line";
export function lineLineDistanceCalc(
  pBase1: Vector,
  pBase2: Vector,
  pDirection1: Vector,
  pDirection2: Vector
): number {
  // If the base vectors are equal, the lines intersect, and the distance is 0
  if (pBase1 === pBase2) {
    return 0;
  }

  // Check if the direction vectors are linearly dependent
  let linDep = checkLinearDependence(pDirection1, pDirection2);
  if (linDep) {
    // Calculate the distance between a point on the first line and the second line
    return pointLineDistanceCalc(pBase1, pBase2, pDirection1);
  }

  // Calculate the distance between the lines
  const distance = calculateDistance(pBase1, pBase2, pDirection1, pDirection2);
  return distance;
}

// Check if two vectors are linearly dependent
function checkLinearDependence(vector1: Vector, vector2: Vector): boolean {
  return vector1.crossProduct(vector2).equals(new Vector(0, 0, 0));
}

// Calculate the distance between two non-parallel lines
function calculateDistance(
  pBase1: Vector,
  pBase2: Vector,
  pDirection1: Vector,
  pDirection2: Vector
): number {
  // Calculate the vector between the two base points
  const baseVector: Vector = pBase2.subtract(pBase1);

  // Calculate the cross product of the direction vectors
  const crossProduct: Vector = pDirection1.crossProduct(pDirection2);

  // Calculate the magnitude of the cross product
  const crossProductMagnitude: number = crossProduct.magnitude();

  // Calculate the distance between the lines
  const distance: number =
    Math.abs(baseVector.dotProduct(crossProduct)) / crossProductMagnitude;
  const distance: number =
    Math.abs(baseVector.dotProduct(crossProduct)) / crossProductMagnitude;

  return distance;
}

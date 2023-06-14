import type { Vector } from "./classes";

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
    const distance = calculateDistanceLinearDependent(pBase1, pBase2, pDirection1, pDirection2);
    return distance;
  }

  // Calculate the distance between the lines
  const distance = calculateDistance(pBase1, pBase2, pDirection1, pDirection2);
  return distance;
}

// Check if two vectors are linearly dependent
function checkLinearDependence(vector1: Vector, vector2: Vector): boolean {
  // Check if the vectors are zero vectors
  if (
    vector1.xCord === 0 &&
    vector1.yCord === 0 &&
    vector1.zCord === 0 &&
    vector2.xCord === 0 &&
    vector2.yCord === 0 &&
    vector2.zCord === 0
  ) {
    return true;
  }

  // Calculate ratios between corresponding elements
  const ratios: number[] = [];
  if (vector1.xCord !== 0) {
    ratios.push(vector2.xCord / vector1.xCord);
  }
  if (vector1.yCord !== 0) {
    ratios.push(vector2.yCord / vector1.yCord);
  }
  if (vector1.zCord !== 0) {
    ratios.push(vector2.zCord / vector1.zCord);
  }

  // Check if all ratios are equal
  const isLinearlyDependent: boolean = ratios.every(
    (ratio) => ratio === ratios[0]
  );

  return isLinearlyDependent;
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
  const distance: number = Math.abs(baseVector.dotProduct(crossProduct)) / crossProductMagnitude;

  return distance;
}

// Calculate the distance between a point on the first line and the second line (linearly dependent case)
function calculateDistanceLinearDependent(
  pBase1: Vector,
  pBase2: Vector,
  pDirection1: Vector,
  pDirection2: Vector
): number {
  // Calculate the vector between the two base points
  const baseVector: Vector = pBase2.subtract(pBase1);

  // Calculate the magnitude of the direction vector
  const direction1Magnitude: number = pDirection1.magnitude();

  // Calculate the projection of the base vector onto the direction vector
  const projection: number = baseVector.dotProduct(pDirection1) / direction1Magnitude;

  return Math.abs(projection);
}

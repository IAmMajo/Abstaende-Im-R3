import type { Vector } from "./classes";

export function lineLineDistanceCalc(
  pBase1: Vector,
  pBase2: Vector,
  pDirection1: Vector,
  pDirection2: Vector
): number {
  console.log(checkLinearDependence(pDirection1, pDirection2));
  return 0;
}

//true = linear dependent
function checkLinearDependence(vector1: Vector, vector2: Vector): boolean {
  let x;
  let y;
  let z;
  if (vector1.xCord !== 0) {
    x = Math.abs(vector2.xCord / vector1.xCord);
  } else if (vector2.xCord !== 0) {
    x = Math.abs(vector1.xCord / vector2.xCord);
  } else {
    x = 0;
  }

  if (vector1.yCord !== 0) {
    y = Math.abs(vector2.yCord / vector1.yCord);
  } else if (vector2.yCord !== 0) {
    y = Math.abs(vector1.yCord / vector2.yCord);
  } else {
    y = 0;
  }

  if (vector1.zCord !== 0) {
    z = Math.abs(vector2.zCord / vector1.zCord);
  } else if (vector2.zCord !== 0) {
    z = Math.abs(vector1.zCord / vector2.zCord);
  } else {
    z = 0;
  }

  if ((x === y || x === 0 || y === 0) && (y === z || y === 0 || z === 0)) {
    return true;
  }

  return false;
}

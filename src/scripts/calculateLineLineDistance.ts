import Line from "../classes/Line";
import Vector from "../classes/Vector";
import calculatePointLineDistance from "./calculatePointLineDistance";

export default (line1: Line, line2: Line) => {
  const { base: line1Base, direction: line1Direction } = line1;
  const { base: line2Base, direction: line2Direction } = line2;

  // If the base vectors are equal, the lines intersect, and the distance is 0
  if (line1Base.equals(line2Base)) {
    return 0;
  }

  // Check if the direction vectors are linearly dependent
  const linearDependent = checkLinearDependence(line1Direction, line2Direction);

  if (linearDependent) {
    /*
     * Calculate the distance between a point on the first line and the second
     * line
     */
    return calculatePointLineDistance(line1Base, line2);
  }

  // Calculate the distance between the lines
  return calculateDistance(
    new Line(line1Base, line1Direction),
    new Line(line2Base, line2Direction)
  );
};

/** Check if two vectors are linearly dependent */
function checkLinearDependence(vector1: Vector, vector2: Vector) {
  return vector1.crossMultiply(vector2).equals(new Vector(0, 0, 0));
}

/** Calculate the distance between two non-parallel lines */
function calculateDistance(line1: Line, line2: Line) {
  // Calculate the vector between the two base points
  const base = line2.base.subtract(line1.base);

  // Calculate the cross product of the direction vectors
  const crossProduct = line1.direction.crossMultiply(line2.direction);

  // Calculate the magnitude of the cross product
  const crossProductMagnitude = crossProduct.magnitude;

  // Calculate the distance between the lines
  return Math.abs(base.dotMultiply(crossProduct)) / crossProductMagnitude;
}

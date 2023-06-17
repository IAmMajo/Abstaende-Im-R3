import type Plane from "../classes/Plane";
import type Vector from "../classes/Vector";

export default (point: Vector, plane: Plane) => {
  const normal = plane.direction1.crossMultiply(plane.direction2);
  return (
    Math.abs(point.subtract(plane.base).dotMultiply(normal)) / normal.magnitude
  );
};

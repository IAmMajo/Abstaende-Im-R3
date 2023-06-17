import type Line from "../classes/Line";
import type Vector from "../classes/Vector";

export default (point: Vector, line: Line) => {
  const lineDirection = line.direction;
  return (
    point.subtract(line.base).crossMultiply(lineDirection).magnitude /
    lineDirection.magnitude
  );
};

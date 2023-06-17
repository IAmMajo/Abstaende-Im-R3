/** Basically just a point in 3D space */
export default class Vector {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  equals(vector: Vector) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  dotMultiply(vector: Vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  crossMultiply(vector: Vector) {
    const { x: vectorX, y: vectorY, z: vectorZ } = vector;
    return new Vector(
      this.y * vectorZ - this.z * vectorY,
      this.z * vectorX - this.x * vectorZ,
      this.x * vectorY - this.y * vectorX
    );
  }
}

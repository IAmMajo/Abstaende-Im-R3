//Basically just a point in 3D space
export class Vector {
  xCord: number = 0;
  yCord: number = 0;
  zCord: number = 0;

  constructor(pX: number, pY: number, pZ: number) {
    this.xCord = pX;
    this.yCord = pY;
    this.zCord = pZ;
  }

  public add(pPoint: Vector): Vector {
    return new Vector(
      this.xCord + pPoint.xCord,
      this.yCord + pPoint.yCord,
      this.zCord + pPoint.zCord
    );
  }

  public subtract(pPoint: Vector): Vector {
    return new Vector(
      this.xCord - pPoint.xCord,
      this.yCord - pPoint.yCord,
      this.zCord - pPoint.zCord
    );
  }

  public dotProduct(pPoint: Vector): number {
    return(this.xCord * pPoint.xCord + this.yCord * pPoint.yCord + this.zCord * pPoint.zCord);
  }

  public magnitude(): number {
    return Math.sqrt(this.xCord * this.xCord + this.yCord * this.yCord + this.zCord * this.zCord);
  }
}

//A vector with a base and a direction
export class DirectionalVector {
  base: Vector = new Vector(0, 0, 0);
  direction: Vector = new Vector(0, 0, 0);

  constructor(pBase: Vector, pDirection: Vector) {
    this.base = pBase;
    this.direction = pDirection;
  }

  public add(pVector: DirectionalVector): DirectionalVector {
    return new DirectionalVector(
      this.base.add(pVector.base),
      this.direction.add(pVector.direction)
    );
  }

  public subtract(pVector: DirectionalVector): DirectionalVector {
    return new DirectionalVector(
      this.base.subtract(pVector.base),
      this.direction.subtract(pVector.direction)
    );
  }
}

//A plane with a base and two directions
export class Plane {
  Vector1: DirectionalVector = new DirectionalVector(new Vector(0, 0, 0), new Vector(0, 0, 0));
  Vector2: DirectionalVector = new DirectionalVector(new Vector(0, 0, 0), new Vector(0, 0, 0));

  constructor(pBase: Vector, pDirection1: Vector, pDirection2: Vector) {
    this.Vector1 = new DirectionalVector(pBase, pDirection1);
    this.Vector2 = new DirectionalVector(pBase, pDirection2);
  }
}

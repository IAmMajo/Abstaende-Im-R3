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

  public equals(pPoint:Vector):boolean{
    return this.xCord === pPoint.xCord && this.yCord === pPoint.yCord && this.zCord === pPoint.zCord;
  }

  public dotProduct(pPoint: Vector): number {
    return (
      this.xCord * pPoint.xCord +
      this.yCord * pPoint.yCord +
      this.zCord * pPoint.zCord
    );
  }

  public crossProduct(pPoint: Vector): Vector {
    return new Vector(
      this.yCord * pPoint.zCord - this.zCord * pPoint.yCord,
      this.zCord * pPoint.xCord - this.xCord * pPoint.zCord,
      this.xCord * pPoint.yCord - this.yCord * pPoint.xCord
    );
  }

  public magnitude(): number {
    return Math.sqrt(
      this.xCord * this.xCord +
        this.yCord * this.yCord +
        this.zCord * this.zCord
    );
  }
}

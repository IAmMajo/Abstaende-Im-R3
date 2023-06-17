import p5, { Vector as P5Vector } from "p5";
import Line from "../classes/Line";
import type Plane from "../classes/Plane";
import Vector from "../classes/Vector";

const main = document.querySelector("main")!;
const htmlStyle = getComputedStyle(document.documentElement);
let sketch: p5 | null = null;

export default (...geometrics: (Vector | Line | Plane)[]) => {
  if (sketch) {
    sketch.remove();
  }
  const sketchElement = document.createElement("div");
  sketchElement.id = "sketch";
  main.appendChild(sketchElement);
  sketch = new p5((p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(1200, 800, p5.WEBGL);
    };
    p5.draw = () => {
      console.log("craw");
      p5.background(htmlStyle.getPropertyValue("--md-sys-color-surface"));
      geometrics.forEach((geometric) => {
        if (geometric instanceof Vector) {
          p5.translate(geometric.x, geometric.y, geometric.z);
          p5.push();
          p5.noStroke();
          p5.fill(0, 0, 255);
          p5.sphere(10);
          p5.pop();
          return;
        }
        if (geometric instanceof Line) {
          const { base, direction: geometricDirection } = geometric;
          const start = new P5Vector(base.x, base.y, base.z);
          const p5Direction = new P5Vector(
            geometricDirection.x,
            geometricDirection.y,
            geometricDirection.z
          );

          const normalizedDirection = p5Direction.normalize();
          const lineLength = 200;
          const end = start.add(normalizedDirection.mult(lineLength));

          p5.push();
          p5.noFill();
          p5.stroke(255, 0, 0);
          p5.strokeWeight(10);
          p5.line(start.x, start.y, start.z, end.x, end.y, end.z);
          p5.pop();

          return;
        }
        // Draw plane
      });
    };
  }, sketchElement);
};

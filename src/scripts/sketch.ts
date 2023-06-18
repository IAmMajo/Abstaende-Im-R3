import "@material/web/circularprogress/circular-progress";
import type p5 from "p5";
import type { Vector as P5Vector } from "p5";
import Line from "../classes/Line";
import type Plane from "../classes/Plane";
import Vector from "../classes/Vector";

const main = document.querySelector("main")!;
const htmlStyle = getComputedStyle(document.documentElement);
let p5Class: typeof p5 | null = null;
let P5VectorClass: typeof P5Vector | null = null;
let sketch: p5 | null = null;

export default async (...geometrics: (Vector | Line | Plane)[]) => {
  const sketchElement = document.createElement("div");
  sketchElement.id = "sketch";
  main.appendChild(sketchElement);
  if (p5Class && P5VectorClass) {
    sketch?.remove();
  } else {
    const progress = document.createElement("md-circular-progress");
    progress.indeterminate = true;
    sketchElement.appendChild(progress);
    p5Class = (await import("p5")).default;
    P5VectorClass = p5Class.Vector;
    if (!sketchElement.parentElement) {
      return;
    }
    progress.remove();
  }
  sketch = new p5Class((p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(1200, 800, p5.WEBGL);
    };
    p5.draw = () => {
      p5.background(htmlStyle.getPropertyValue("--md-sys-color-surface"));
      geometrics.forEach((geometric) => {
        if (geometric instanceof Vector) {
          p5.push();
          p5.translate(geometric.x, geometric.y, geometric.z);
          p5.noStroke();
          p5.fill(0, 0, 255);
          p5.sphere(10);
          p5.pop();
          return;
        }
        if (geometric instanceof Line) {
          const { base: geometricBase, direction: geometricDirection } =
            geometric;
          const p5Base = new P5VectorClass!(
            geometricBase.x,
            geometricBase.y,
            geometricBase.z
          );
          const p5Direction = new P5VectorClass!(
            geometricDirection.x,
            geometricDirection.y,
            geometricDirection.z
          );

          const normalizedDirection = p5Direction.copy().normalize();
          const lineLength = 1201;
          const start = p5Base
            .copy()
            .add(normalizedDirection.copy().mult(-lineLength));
          const end = p5Base
            .copy()
            .add(normalizedDirection.copy().mult(lineLength));

          p5.push();
          p5.noFill();
          p5.stroke(255, 0, 0);
          p5.strokeWeight(10);
          console.log(start.x, start.y, start.z, end.x, end.y, end.z);
          p5.line(start.x, start.y, start.z, end.x, end.y, end.z);
          p5.pop();

          return;
        }
        const {
          base: geometricBase,
          direction1: geometricDirection1,
          direction2: geometricDirection2,
        } = geometric;
        const p5Base = new P5VectorClass!(
          geometricBase.x,
          geometricBase.y,
          geometricBase.z
        );
        const p5Direction1 = new P5VectorClass!(
          geometricDirection1.x,
          geometricDirection1.y,
          geometricDirection1.z
        );
        const p5Direction2 = new P5VectorClass!(
          geometricDirection2.x,
          geometricDirection2.y,
          geometricDirection2.z
        );

        p5.push();
        p5.translate(p5Base.x, p5Base.y, p5Base.z);
        p5.noStroke();
        p5.fill(0, 255, 0, 80);
        p5.plane(1201, 1201);
        p5.pop();

        return;
      });
    };
  }, sketchElement);
};

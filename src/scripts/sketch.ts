import "@material/web/circularprogress/circular-progress";
import "@material/web/slider/slider";
import type p5 from "p5";
import type { Vector as P5Vector } from "p5";
import Line from "../classes/Line";
import type Plane from "../classes/Plane";
import Vector from "../classes/Vector";

const main = document.querySelector("main")!;
const bodyStyle = getComputedStyle(document.body);
let p5Class: typeof p5 | null = null;
let P5VectorClass: typeof P5Vector | null = null;
let sketch: p5 | null = null;

export default async (...geometrics: (Vector | Line | Plane)[]) => {
  const sketchElement = document.createElement("div");
  sketchElement.id = "sketch";
  const slider = document.createElement("md-slider");
  slider.labeled = true;
  slider.value = 180;
  slider.min = 0;
  slider.max = 360;
  main.append(sketchElement, slider);
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
      p5.createCanvas(1200, 1200, p5.WEBGL);
    };
    p5.draw = () => {
      p5.background(bodyStyle.getPropertyValue("--sketch-background"));
      p5.angleMode("degrees");
      p5.rotateY(slider.value);
      p5.directionalLight(0, 0, 250, 125, 200, 0.25);
      p5.ambientMaterial(255);
      geometrics.forEach((geometric) => {
        if (geometric instanceof Vector) {
          p5.push();
          p5.translate(geometric.x, -geometric.z, -geometric.y);
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
            -geometricBase.z,
            -geometricBase.y
          );
          const p5Direction = new P5VectorClass!(
            geometricDirection.x,
            -geometricDirection.z,
            -geometricDirection.y
          ).normalize();
          const start = p5Base.copy().sub(p5Direction.copy().mult(1200));
          const end = p5Base.copy().add(p5Direction.copy().mult(1200));

          p5.push();
          p5.noFill();
          p5.stroke(255, 0, 0);
          p5.strokeWeight(10);

          /*
           * This would be better but doesn't work because it is not possible to
           * first do rotateX and then rotateY.
           *
           * p5.translate(p5Base.x, p5Base.y, p5Base.z);
           * p5.rotateX(new P5VectorClass!(0, -1, 0).angleBetween(p5Direction));
           * p5.rotateY(new P5VectorClass!(0, 0, 1).angleBetween(p5Direction));
           * p5.cylinder(10, 2400);
           */

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
          -geometricBase.z,
          -geometricBase.y
        );
        const p5Direction1 = new P5VectorClass!(
          geometricDirection1.x,
          -geometricDirection1.z,
          -geometricDirection1.y
        );
        const p5Direction2 = new P5VectorClass!(
          geometricDirection2.x,
          -geometricDirection2.z,
          -geometricDirection2.y
        );

        p5.push();
        p5.translate(p5Base.x, p5Base.y, p5Base.z);
        p5.noStroke();
        p5.fill(0, 255, 0, 80);
        p5.plane(2400, 2400);
        p5.pop();

        return;
      });
    };
  }, sketchElement);
};

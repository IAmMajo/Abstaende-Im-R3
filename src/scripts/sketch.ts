import "@material/web/circularprogress/circular-progress";
import "@material/web/slider/slider";
import type p5 from "p5";
import type { Vector as P5Vector } from "p5";
import Line from "../classes/Line";
import type Plane from "../classes/Plane";
import Vector from "../classes/Vector";

const COLORS = ["--sketch-first-color", "--sketch-second-color"];

const main = document.querySelector("main")!;
const bodyStyle = getComputedStyle(document.body);
let p5Class: typeof p5 | null = null;
let P5VectorClass: typeof P5Vector | null = null;
let sketch: p5 | null = null;

export default async (...geometrics: (Vector | Line | Plane)[]) => {
  const sketchElement = document.createElement("div");
  sketchElement.id = "sketch";
  const slider = document.createElement("md-slider");
  slider.value = 0;
  slider.labeled = true;
  slider.max = 360;
  main.append(sketchElement, slider);
  if (p5Class && P5VectorClass) {
    sketch?.remove();
  } else {
    const progress = document.createElement("md-circular-progress");
    progress.indeterminate = true;
    sketchElement.appendChild(progress);
    slider.disabled = true;
    p5Class = (await import("p5")).default;
    P5VectorClass = p5Class.Vector;
    if (!sketchElement.parentElement && !slider.parentElement) {
      return;
    }
    progress.remove();
    slider.disabled = false;
  }
  sketch = new p5Class((p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(1200, 1200, p5.WEBGL);
    };
    const zAxis = new P5VectorClass!(0, 0, 1);
    const yAxis = new P5VectorClass!(0, 1, 0);
    p5.draw = () => {
      p5.background(bodyStyle.getPropertyValue("--sketch-background"));
      p5.pointLight(255, 255, 255, 100, -700, 300);
      p5.rotateY(p5.radians(-slider.value));
      geometrics.forEach((geometric, index) => {
        p5.push();
        let base: Vector | null = null;
        if (geometric instanceof Vector) {
          base = geometric;
        } else {
          base = geometric.base;
        }
        p5.translate(base.x, -base.z, -base.y);
        p5.noStroke();
        p5.fill(bodyStyle.getPropertyValue(COLORS[index]));
        if (geometric instanceof Vector) {
          p5.sphere(10);
        } else if (geometric instanceof Line) {
          const geometricDirection = geometric.direction;
          const p5Direction = new P5VectorClass!(
            geometricDirection.x,
            -geometricDirection.z,
            -geometricDirection.y
          );
          const flatDirection = p5Direction.copy();
          flatDirection.y = 0;
          let angleY = zAxis.angleBetween(flatDirection);
          if (angleY) {
            if (
              (flatDirection.x < 0 && flatDirection.z <= 0) ||
              (flatDirection.z > 0 && flatDirection.x >= 0)
            ) {
              angleY = -angleY;
            }
          } else {
            angleY = 0;
          }
          p5.rotateY(angleY);
          p5.rotateX(Math.abs(yAxis.angleBetween(p5Direction)));
          p5.cylinder(10, 2400);
        } else {
          const {
            direction1: geometricDirection1,
            direction2: geometricDirection2,
          } = geometric;
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
          p5.plane(2400, 2400);
        }
        p5.pop();
      });
    };
  }, sketchElement);
};

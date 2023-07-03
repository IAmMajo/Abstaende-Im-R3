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
    // const xAxis = new P5VectorClass!(1, 0, 0);
    p5.draw = () => {
      p5.background(bodyStyle.getPropertyValue("--sketch-background"));
      p5.pointLight(255, 255, 255, 500, -5000, 100);
      p5.pointLight(128, 128, 128, 100, 500, 100);
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
          p5.pop();
          return;
        }
        let geometricDirection1: Vector | null = null;
        if (geometric instanceof Line) {
          geometricDirection1 = geometric.direction;
        } else {
          geometricDirection1 = geometric.direction1;
        }
        const p5Direction1 = new P5VectorClass!(
          geometricDirection1.x,
          -geometricDirection1.z,
          -geometricDirection1.y
        );
        const flatDirection = p5Direction1.copy();
        flatDirection.y = 0;
        let angleY = zAxis.angleBetween(flatDirection);
        if (angleY) {
          if (flatDirection.x < 0) {
            angleY = -angleY;
          }
        } else {
          angleY = 0;
        }
        p5.rotateY(angleY);
        const angleX = Math.abs(yAxis.angleBetween(p5Direction1));
        p5.rotateX(angleX);
        if (geometric instanceof Line) {
          p5.cylinder(5, 2400);
          p5.pop();
          return;
        }

        /*
         * Second direction vector needs to be taken into account too, but I am
         * too stupid.
         *
         * const geometricDirection2 = geometric.direction2;
         * const p5Direction2 = new P5VectorClass!(
         *   geometricDirection2.x,
         *   -geometricDirection2.z,
         *   -geometricDirection2.y
         * );
         * let percentageY = angleX / p5.HALF_PI;
         * if (angleX > p5.HALF_PI) {
         *   percentageY = (p5.PI - angleX) / p5.HALF_PI;
         * }
         * p5Direction2.y *= percentageY;
         * p5Direction2.z *= 1 - percentageY;
         * p5.rotateY(-xAxis.angleBetween(p5Direction2));
         */

        p5.box(2400, 2400, 5);
        p5.pop();
      });
    };
  }, sketchElement);
};

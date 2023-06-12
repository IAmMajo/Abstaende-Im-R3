import p5 from "p5";

new p5((p5: p5) => {
  p5.setup = () => {
    p5.createCanvas(1200, 800, p5.WEBGL);
  };
  let angle = 0;
  let dark = true;
  let light = false;
  let colordark = 20;
  let colorlight = 248;
  p5.draw = () => {
    p5.background(colordark);
    p5.rectMode(p5.CENTER);
    p5.noStroke();
    p5.fill(0, 0, 255);
    p5.rotateY(angle);
    p5.rect(0, 0, 200, 300);

    angle += 0.007;
  };
}, document.getElementById("visual")!);

let angle = 0;
let dark = true;
let light = false;
let colordark = 20;
let colorlight = 248;
window.setup = function () {
  const Canvas = createCanvas(1200, 800, WEBGL);
  Canvas.parent("visual");
};

window.draw = function () {
  background(colordark);
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 255);
  rotateY(angle);
  rect(0, 0, 200, 300);

  angle += 0.007;
};

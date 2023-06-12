let angle = 0;

window.setup = function () {
  const Canvas = createCanvas(1200, 800, WEBGL);
  Canvas.parent("visual");
};

window.draw = function () {
  background(175);
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 255);
  rotateY(angle);
  rect(0, 0, 200, 300);

  angle += 0.007;
};

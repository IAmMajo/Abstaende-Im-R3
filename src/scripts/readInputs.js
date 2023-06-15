//Input Line

import { Vector } from "./classes";

//Richtungsvektoren
let lineDirX = document.getElementById("lineDirX");
let lineDirY = document.getElementById("lineDirY");
let lineDirZ = document.getElementById("lineDIrZ");

function getInput() {
  //Richtungsvektor
  new Vector(lineDirX.value, lineDirY.value, lineDirZ.value);
}

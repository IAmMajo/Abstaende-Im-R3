import type { MdFilledButton } from "@material/web/button/filled-button";
import type { MdFilledTextField } from "@material/web/textfield/filled-text-field";

const form = document.querySelector<HTMLFormElement>("form")!;
addEventListener("input", () => {
  let button = document.querySelector<MdFilledButton>("md-filled-button");
  if (!button) {
    document.querySelector<HTMLParagraphElement>("#result")!.remove();
    document.querySelector<HTMLDivElement>("#sketch")!.remove();
    button = document.createElement("md-filled-button");
    button.type = "submit";
    button.textContent = "Abstand berechnen";
    form.appendChild(button);
  }
  button.disabled = !Array.from(
    document.querySelectorAll<MdFilledTextField>("md-filled-text-field")
  ).every((coordinate) => !coordinate.validationMessage);
});

addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector<MdFilledButton>("md-filled-button")!.remove();
});

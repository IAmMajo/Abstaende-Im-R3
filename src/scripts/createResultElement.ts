const main = document.querySelector("main")!;

export default (result: number) => {
  const resultElement = document.createElement("p");
  resultElement.id = "result";
  resultElement.textContent = `Der Abstand beträgt ${result
    .toLocaleString("de", { maximumFractionDigits: 4 })
    .replaceAll(".", " ")} LE.`;
  resultElement.classList.add("surface-container-highest");
  main.appendChild(resultElement);
};

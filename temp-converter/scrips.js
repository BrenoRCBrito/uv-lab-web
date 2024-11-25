let tempInput = document.querySelector("#temp-input");
let tempTypeInput = document.querySelector("#temp-type-input");
let resultContainer = document.querySelector("#result");
let formBtn = document.querySelector("#form-btn");
let resultContent = document.querySelector("#result-content");

function buttonAction(event) {
  event.preventDefault();
  let value = tempInput.value;
  if (resultContent === null) {
    let resultDiv = document.createElement("div");
    resultDiv.id = "result-content";
    resultDiv.innerText = convertTemp(value);
    resultContainer.appendChild(resultDiv);
    resultContent = document.querySelector("#result-content");
  } else {
    resultContent.innerText = convertTemp(value);
  }
  tempInput.value = null;
}

function convertTemp(tempString) {
  let floatValue = parseFloat(tempString);
  let numberValue;
  if (isNaN(floatValue)) {
    alert("Valor inválido");
  }
  if (tempTypeInput.value === "") {
    alert("Selecione a unidade");
  } else if (tempTypeInput.value === "c") {
    numberValue = floatValue * (9 / 5) + 32;
    return numberValue + " Fahrenheit";
  } else if (tempTypeInput.value === "f") {
    numberValue = (floatValue - 32) * (5 / 9);
    return numberValue + " Celsius";
  }
  return null;
}

formBtn.addEventListener("click", buttonAction);

let textArea = document.querySelector("#textarea-input");
let counterContainer = document.querySelector("#counter-container");
let resultContent = document.querySelector("#result-content");

textArea.oninput = textAreaAction
function textAreaAction(event) {
  event.preventDefault();
  let value = textArea.value;
  if (resultContent === null) {
    let resultDiv = document.createElement("div");
    resultDiv.id = "result-content";
    resultDiv.innerText = "Caracteres: " + value.length;
    counterContainer.appendChild(resultDiv);
    resultContent = document.querySelector("#result-content");
  } else {
    counterContainer.innerText = "Caracteres: " + value.length;
  }
}
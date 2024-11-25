const clockDiv = document.getElementById("clock");
const clock = new Date();
clockDiv.innerText = clock.toLocaleTimeString("pt-br");

setInterval(() => {
  clock.setSeconds(clock.getSeconds() + 1);
  clockDiv.innerText = clock.toLocaleTimeString("pt-br");
}, 1000);

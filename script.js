const buttons = document.querySelectorAll("button");
const display = document.querySelector("input");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.type) {
      case "ac":
        display.value = "0";
        break;
      case "calc":
        display.value = eval(display.value);
        break;
      default:
        let str = display.value;
        if (isNaN(str[str.length - 1]) && isNaN(button.innerText)) break;
        //display에 마지막으로 입력된 값이 연산자이고 입력하려는 값이 연산자이면 무시처리
        if (display.value === "0") {
          if (isNaN(button.innerText)) break;
          //첫 입력값으로 연산자 입력 금지
          display.value = "";
        }
        display.value += button.innerText;
        break;
    }
  });
});

const buttons = document.querySelectorAll("button");
const display = document.querySelector("input");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.type) {
      case "ac":
        display.value = "0";
        break;
      case "calc":
        //연산자를 구분자로 나눈다 (+,-,%,/,*)
        let splittedArr = display.value.split(/(\+|\-|\%|\/|\*)/);

        const operators = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
          "%": (a, b) => a % b,
        };
        //계산을 돌린다
        const calculate = (a, fn, b) => {
          return fn(+a, +b);
        };

        let stack = [];
        // * / % 연산 우선처리
        splittedArr.forEach((secondNum) => {
          let check = stack[stack.length - 1];
          if (check === "*" || check === "/" || check === "%") {
            let operator = stack.pop();
            let firstNum = stack.pop();
            let result = calculate(firstNum, operators[operator], secondNum);
            stack.push(result);
          } else {
            stack.push(secondNum);
          }
        });

        let newStack = [];
        // + - 연산 처리
        stack.forEach((secondNum) => {
          let check = newStack[newStack.length - 1];
          if (check === "+" || check === "-") {
            let operator = newStack.pop();
            let firstNum = newStack.pop();
            let result = calculate(firstNum, operators[operator], secondNum);
            newStack.push(result);
          } else {
            newStack.push(secondNum);
          }
        });

        display.value = newStack.pop();
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

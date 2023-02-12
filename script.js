let currentOperand = '';
let previousOperand = '';
let operation;

const clear = () => {
  currentOperand = '';
  previousOperand = '';
  operation = "";
};

const deleteOperand = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

const appendNumber = (number) => {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = (op) => {
  if (!currentOperand) return;

  if (previousOperand) {
    operate();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
};

const add = (num1, num2) => {
  return num1 + num2;
}

const subtract = (num1, num2) => {
  return num1 - num2;
}

const multiply = (num1, num2) => {
  return num1 * num2;
}

const divide=(num1, num2) => {
  return num1 / num2;
}

const operate = () => {
  let computation;
  const num1 = parseFloat(previousOperand);
  const num2 = parseFloat(currentOperand);
  if (isNaN(num1) || isNaN(num2)) return;
  
  computation = operation === '+'
    ? add(num1,num2)
    : operation === '-'
    ? subtract(num1,num2)
    : operation === '*'
    ? multiply(num1,num2)
    : operation === '÷'
    ? divide(num1,num2)
    : undefined;
  
  if (computation === undefined) return;

  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
};


const getDisplayNumber = (number) => {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
};

const updateDisplay = () => {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
};

const init = () => {

  previousOperandTextElement = document.querySelector('[previous]')
  currentOperandTextElement = document.querySelector('[current]')

  const numberButtons = document.querySelectorAll('[number]')
  const operationButtons = document.querySelectorAll('[operation]')
  const equalsButton = document.querySelector('[equals]')
  const deleteButton = document.querySelector('[delete]')
  const allClearButton = document.querySelector('[allClear]')


  numberButtons.forEach(button => {
  button.addEventListener('click', () => {
  appendNumber(button.innerText);
  updateDisplay();
  });
  });
  
  operationButtons.forEach(button => {
  button.addEventListener('click', () => {
  chooseOperation(button.innerText);
  updateDisplay();
  });
  });
  
  equalsButton.addEventListener('click', () => {
  operate();
  updateDisplay();
  });
  
  allClearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
  });
  
  deleteButton.addEventListener('click', () => {
  deleteOperand();
  updateDisplay();
  });

  };


  
  init();



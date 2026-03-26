const displayOperation = document.getElementById('display-operation');
const displayResult = document.getElementById('display-result');
const buttons = document.querySelectorAll('.box-buttons button');

let currentInput = '0';
let fullOperation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        const ariaLabel = button.getAttribute('aria-label');

        if (button.classList.contains('btn-clear')) {
            clearAll();
        } else if (button.classList.contains('btn-delete')) {
            deleteLast();
        } else if (button.classList.contains('btn-equal')) {
            calculate();
        } else if (ariaLabel === 'Parênteses') {
            handleParentheses();
        } else if (button.classList.contains('btn-operator')) {
            addOperator(buttonText);
        } else if (buttonText === '%') {
            addPercentage();
        } else {
            addNumber(buttonText);
        }

        updateDisplay();
    });
});

function updateDisplay() {
    displayResult.innerText = currentInput;
    displayOperation.innerText = fullOperation;
}

function addNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
}

function addOperator(operator) {
    if (currentInput !== '') {
        fullOperation += currentInput + ' ' + operator + ' ';
        currentInput = '0';
    }
}

function addPercentage() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
}

function handleParentheses() {
    const openCount = (fullOperation.match(/\(/g) || []).length;
    const closeCount = (fullOperation.match(/\)/g) || []).length;

    if (openCount > closeCount) {
        fullOperation += currentInput + ') ';
        currentInput = '';
    } else {
        fullOperation += '( ';
    }
}

function clearAll() {
    currentInput = '0';
    fullOperation = '';
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

function calculate() {
    try {
        let expression = fullOperation + currentInput;

        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');

        const result = eval(expression);

        displayResult.innerText = result;
        fullOperation = '';
        currentInput = result.toString();
    } catch (error) {
        displayResult.innerText = 'Erro';
        setTimeout(clearAll, 1500);
    }
}

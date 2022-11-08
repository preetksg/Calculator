const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calcKeys');
const display = calculator.querySelector('.calcDisp');
let pairCount = 0;

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
                calculator.dataset.previousKeyType = 'number';
              } 
            else {
                display.textContent = displayedNum + keyContent;
              }
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            if (pairCount == 0) {
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
                console.log(pairCount);
                pairCount = 1;
            }
            else if (pairCount == 1) {
                console.log(pairCount);
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;
                display.textContent = Math.round(operate(firstValue, operator, secondValue)*100)/100;
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = display.textContent;
                calculator.dataset.operator = action;
            }
          }
        
        if (action === 'clear') {
            const displayedNum = 0;
            display.textContent = displayedNum;
        }
        
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = Math.round(operate(firstValue, operator, secondValue)*100)/100;
            pairCount = 0;
        }
    }
   })

// const key = e.target;
// const action = key.dataset.action;

// if (!action) {
//     console.log('number key!');
// }
// if (
//     action === 'add' ||
//     action === 'subtract' ||
//     action === 'multiply' ||
//     action === 'divide'
//   ) {
//     console.log('operator key!')
//   }

// if (action === 'clear') {
//   console.log('clear key!')
// }

// if (action === 'calculate') {
//   console.log('equal key!')
// }


function add (a, b) {
    return a + b;
  };

function subtract (a, b) {
    return a - b;
  };

function multiply (a, b) {
    return a * b;
  };

function divide (a, b) {
    return a / b;
  };


function operate (a, op, b) {
    //console.log(a);
    a = a.replace(/\s/g,'');
    b = b.replace(/\s/g,'');
    a = parseFloat(a);
    b = parseFloat(b);

    if(op === 'add') {
        return(add(a,b));
    }
    if(op === 'subtract') {
        return(subtract(a,b));
    }
    if(op === 'multiply') {
        return(multiply(a,b));
    }
    if(op === 'divide') {
        if(b == 0) {
            return("ERROR, CAN'T DIVIDE BY ZERO");
        }
        else {
            return(divide(a,b));
        }
    }
}

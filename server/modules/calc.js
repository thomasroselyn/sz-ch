let calculateObject = (newObject) => {
    switch (newObject.operator) {
        case '+':
            newObject.result = parseFloat(newObject.firstNumber) + parseFloat(newObject.secondNumber);
            break;
        case '-':
            newObject.result = newObject.firstNumber - newObject.secondNumber;
            break;
        case '*':
            newObject.result = newObject.firstNumber * newObject.secondNumber;
            break;
        case '/':
            newObject.result = newObject.firstNumber / newObject.secondNumber;
    }
    return newObject;
} //end calculateObject

module.exports = calculateObject;
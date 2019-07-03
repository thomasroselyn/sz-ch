let calculateExpression = (expression) => {
    
    console.log('expression received by calculator:', expression);

    //separate out expression components in an object
    let expObject = {
        firstNumber: '',
        secondNumber: '',
        operator: '',
        result: ''
    };

    //strip out special characters, replace x with *
    expression = expression.replace(/_/g, '');
    expression = expression.replace(/!/g, '');
    expression = expression.replace(/@/g, '');
    expression = expression.replace(/#/g, '');
    expression = expression.replace(/&/g, '');
    expression = expression.replace(/x/g, '*');
    
    //set operator and split expression with it
    if (expression.includes('+')) {
        expObject.operator = '+';
        splitExpression = expression.split('+');
    } else if (expression.includes('-')) {
        expObject.operator = '-';
        splitExpression = expression.split('-');
    } else if (expression.includes('*')) {
        expObject.operator = '*';
        splitExpression = expression.split('*');
    } else if (expression.includes('/')) {
        expObject.operator = '/';
        splitExpression = expression.split('/');
    } else if (expression.includes('%')) {
        expObject.operator = '%';
        splitExpression = expression.split('%');
    }else {
        return false;
    }//end if/else block

    expObject.firstNumber = parseFloat(splitExpression[0]);
    expObject.secondNumber = parseFloat(splitExpression[1]);

    switch (expObject.operator) {
        case '+':
            expObject.result = expObject.firstNumber + expObject.secondNumber;
            break;
        case '-':
            expObject.result = expObject.firstNumber - expObject.secondNumber;
            break;
        case '*':
            expObject.result = expObject.firstNumber * expObject.secondNumber;
            break;
        case '/':
            expObject.result = expObject.firstNumber / expObject.secondNumber;
            break;
        case '%':
            expObject.result = expObject.firstNumber % expObject.secondNumber;
            break;
    }
    
    return `${expObject.firstNumber} ${expObject.operator} ${expObject.secondNumber} = ${expObject.result}`;

} //end calculateObject

module.exports = calculateExpression;
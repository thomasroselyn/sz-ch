$(onReady);

function onReady() {
    getCalcHistory();

    //clear button empties expression input
    $('#clearBtn').on('click', function () {
        $('#expressionIn').val('');
    });

    //equals button calls calculator sequence
    $('#equalsBtn').on('click', postToCalculator);

} //end onReady

function postToCalculator() {
    //validate input data
    if ($('#expressionIn').val()) {
        //send expression to server
        $.ajax({
            type: 'POST',
            url: '/calc',
            data: $('#expressionIn')
        }).then(function (response) {
            //then, get the result
            getCalcHistory();
        });
    } else {
        alert('must enter expression');
    }
} //end postToCalculator

function getCalcHistory() {
    //get result from server
    $.ajax({
        type: 'GET',
        url: '/calc'
    }).then(function(response) {
        //add to history section
        updateHistory(response);
    });
} //end getCalcHistory

function updateHistory(calcHistory) {
    //empty area on DOM
    $('#history').empty();
    //loop through array to add every result string to history section
    for (let item of calcHistory) {
        $('#history').append(`<li>${item.calculation}</li>`);
    }
} //end updateHistory
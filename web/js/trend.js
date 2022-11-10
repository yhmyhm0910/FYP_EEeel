eel.expose(showValue);
function showValue(){
    var selectedValue = document.getElementById('list').value;
    console.log(selectedValue);
    return selectedValue;
}


async function printthing(){
    x = await eel.returnTime()();
    document.getElementById("trial").innerHTML = 'AvgMaxA: ' + await eel.returnAvgMaxA()();
    document.getElementById("trial2").innerHTML = 'Date: ' + x[0];
    document.getElementById("trial3").innerHTML = 'Time: ' + x[1];
    document.getElementById("trial4").innerHTML = 'SteadyA: ' + await eel.returnSteadyA()();
    document.getElementById("trial5").innerHTML = 'Duration: ' + await eel.returnDuration()();
}

var anaChart    //globalize

async function analysisChart(){
    if (anaChart != undefined){
        anaChart.destroy();
    }

    var dateTime = await eel.returnTime()();
    var recordDate = dateTime[0];
    var recordTime = dateTime[1];

    var labels = new Array(10)
    labels.fill(0, 0, 10)    //Fill array with 0
    for (let i = 0; i < labels.length; i++) {
        labels[i] = String(recordDate[labels.length - i - 1]) + '.' + String(recordTime[labels.length - i - 1]);
    }

    var Duration = new Array(34) 
    Duration[0] = 0;
    Duration[1] = 0.06;
    Duration[2] = 0.1,
    Duration[3] = 0.15;
    Duration[4] = 0.2;
    Duration[5] = 0.25;
    Duration[6] = 0.3;
    Duration[7] = 0.35;
    Duration[8] = 0.4;
    Duration[9] = 0.45;
    Duration[10] = 0.8;
    Duration[11] = 1.0;
    Duration[12] = 1.5;
    Duration[13] = 2.1;
    Duration[14] = 2.4;
    Duration[15] = 4.2;
    Duration[16] = 4.4;
    Duration[17] = 4.6;
    Duration[18] = 4.8;
    Duration[19] = 5.0;
    Duration[20] = 5.2;
    Duration[21] = 5.4;
    Duration[22] = 5.6;
    Duration[23] = 5.8;
    Duration[24] = 6.0;
    Duration[25] = 6.2;
    Duration[26] = 6.4;
    Duration[27] = 7.0;
    Duration[28] = 8.0;
    Duration[29] = 9.0;
    Duration[30] = 10.0;
    Duration[31] = 11.9;
    Duration[32] = 12.0;
    Duration[33] = 12.1;

    var opDuration = await eel.returnDuration()();
    for (let i = 0; i < opDuration.length; i++) {
        opDuration[i] = Duration[opDuration[i] - 1];
    }

    var alertMaxA = new Array(10);
    alertMaxA.fill(12, 0 , 10);
    var alarmMaxA = new Array(10);
    alarmMaxA.fill(14, 0 , 10);
    var alertSSC = new Array(10);
    alertSSC.fill(2.6, 0 , 10);
    var alarmSSC = new Array(10);
    alarmSSC.fill(4, 0 , 10);
    var alertOT = new Array(10);
    alertOT.fill(7, 0, 10);
    var alarmOT = new Array(10);
    alarmOT.fill(8.5, 0, 10);


    document.getElementById("trial6").innerHTML = 'opArray: ';

    var maxAdata = {
        labels: labels,
        datasets: [{
            display: true,
            label: 'Actual Current',
            backgroundColor: 'Blue',
            borderColor: 'Blue',
            data: await eel.returnAvgMaxA()(),
            },
            {
                display: true,
                label: 'Minimum Alert Maximum Current',
                backgroundColor: 'Orange',
                borderColor: 'Orange',
                data: alertMaxA
            },
            {
                display: true,
                label: 'Minimum Alarm Maximum Current',
                backgroundColor: 'Red',
                borderColor: 'Red',
                data: alarmMaxA
            }]
        };
    
        var SteadyAdata = {
            labels: labels,
            datasets: [{
                display: true,
                label: 'Actual Current',
                backgroundColor: 'Blue',
                borderColor: 'Blue',
                data: await eel.returnSteadyA()(),
            },
            {
                display: true,
                label: 'Minimum Alert Steady Current',
                backgroundColor: 'Orange',
                borderColor: 'Orange',
                data: alertSSC
            },
            {
                display: true,
                label: 'Minimum Alarm Steady Current',
                backgroundColor: 'Red',
                borderColor: 'Red',
                data: alarmSSC
            }]
        };

    var durationTime = {
        labels: labels,
        datasets: [{
            display: true,
            label: 'Actual Time',
            backgroundColor: 'Blue',
            borderColor: 'Blue',
            data: opDuration,
        },
        {
            display: true,
            label: 'Minimum Alert Time',
            backgroundColor: 'Orange',
            borderColor: 'Orange',
            data: alertOT
        },
        {
            display: true,
            label: 'Minimum Alarm Time',
            backgroundColor: 'Red',
            borderColor: 'Red',
            data: alarmOT
        }]
    };



    if (document.getElementById('toCheck').value == "Maximum Current"){
        opData = maxAdata;
    }
    if (document.getElementById('toCheck').value == "Steady State Current"){
        opData = SteadyAdata;
    }   
    if (document.getElementById('toCheck').value == "Operating Time"){
        opData = durationTime;
    }

    const config = {
    type: 'line',
    data: opData,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Last 10 ' + document.getElementById('toCheck').value + ' of ' + document.getElementById('list').value ,
                font: {size: 30}
            }
        },
        scales: {
            x: {
                display: true,
                title:{
                display: true,
                },
            },
            y: {
                min: 0,
                suggestedMax: 20,
                display: true,
                title:{
                display: true,
                text: 'Current (A)'
                }
            }
        }
    }
    };

    anaChart = new Chart(
    document.getElementById('myChart'),
    config
    );
}

function changeAnaChart(){
    ;
}
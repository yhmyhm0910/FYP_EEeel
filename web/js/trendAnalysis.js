eel.expose(returnAttPMID);
function returnAttPMID(){   //Search By Attribute PMID
    var selectedValue = document.getElementById('AttributePMID').value;
    return selectedValue;
}

eel.expose(returnRecordPMID)
function returnRecordPMID() {    //Search by Record PMID
    const selectedValue = document.getElementById('RecordPMID').value;
    return selectedValue;
}

let returnValue
let confirmBtnAppeared = false
async function handleRecordClick() {    //After choosing PMID
    const returnRDate = await eel.returnRDate()()
    const returnRTime = await eel.returnRTime()()
    let combinedRDateRTime = new Array()
    document.getElementById('currentSelection').innerHTML = 'Current Selection: --None--'
    document.getElementById('currentSelection').style.display = 'inline-block'
    for (let i=0; i < returnRDate.length; i++){
        combinedRDateRTime[i] = returnRDate[i] + ' | ' + returnRTime[i]
        let newBtn = document.createElement('button');
        newBtn.innerText = combinedRDateRTime[i];
        newBtn.style.marginRight = '10px'
        document.getElementById('recordShown').appendChild(newBtn)
        newBtn.onclick = function(e) {      //After choosing Record
            console.log(e.srcElement.innerHTML)
            returnValue = e.srcElement.innerHTML
            document.getElementById('currentSelection').innerHTML = `Current Selection: ${returnValue}`
        }
    }
    let confirmBtn = document.createElement('button');
    if (confirmBtnAppeared === false){
        confirmBtn.innerText = 'Check This Record'
        confirmBtn.style.marginTop = '1rem'
        confirmBtn.style.padding = '10px'
        document.getElementById('confirmDiv').appendChild(confirmBtn)
        confirmBtnAppeared = true
    }
    confirmBtn.onclick = function() {
        showRecordChart()
        showRecordProblem()
    }
}

eel.expose(returnValuefromUser)     //Pass back Record date and time to backend
function returnValuefromUser(){
    return returnValue
}

let Duration = new Array(34) 
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

async function showRecordProblem(){
    const problemData = await eel.returnRecordGraph()()
    const problemData_Max = (problemData[3][1] + problemData[3][2]) /2
    const problemData_Average = (problemData[3][10] + problemData[3][11] + problemData[3][12] + problemData[3][13] + problemData[3][14]) /5
    let problemData_Time
    for (i=0; i<(problemData[3].length); i++){
        if (problemData[3][i] === 0){
            problemData_Time = Duration[i]
        }
    }
    let outputProblem = new Array   //[Status of Max, Status of Average, Status of Time]
        if (problemData_Max < 12){
            outputProblem[0] = 'Normal'
        }
        else if (problemData_Max > 16){
            outputProblem[0] = 'Alarm'
        }   else {
            outputProblem[0] = 'Alert'
        }

        if (problemData_Average < 3){
            outputProblem[1] = 'Normal'
        }
        else if (problemData_Average > 6){
            outputProblem[1] = 'Alarm'
        }   else {
            outputProblem[1] = 'Alert'
        }

        if (problemData_Time < 7.5){
            outputProblem[2] = 'Normal'
        }
        else if (problemData_Time > 10){
            outputProblem[2] = 'Alarm'
        }   else {
            outputProblem[2] = 'Alert'
        }

    document.getElementById('problems').style.display = 'block'
    document.getElementById('MaxAProblem').innerHTML = `${outputProblem[0]} Maximum Current: ${problemData_Max}A`
    document.getElementById('SteadyAProblem').innerHTML = `${outputProblem[1]} Steady Current: ${problemData_Average}A`    
    document.getElementById('TimeProblem').innerHTML = `${outputProblem[2]} Duration of Operation: ${problemData_Time}s`        
}

let recordChart, anaChart //define for conditional
async function showRecordChart(){    //Single graph
    if (recordChart != undefined){
        recordChart.destroy();
    }
    if (anaChart != (undefined)){
        anaChart.destroy();
    }

    const recordData = await eel.returnRecordGraph()()  //[PMID, RDate, RTime, Data]

    const normalData = await eel.normalCurrent()();
    const actualData = recordData[3];
    PMID = recordData[0];
    const title =  `${PMID} | ${recordData[1]} | ${recordData[2]}`;

    let opNormalData = new Array(34)
    for (let i = 0; i < opNormalData.length ; i++) {
        opNormalData[i] = {"x": Duration[i], "y": normalData[i]}
    }

    var opActualData = new Array(34)
    for (let i = 0; i < opActualData.length ; i++) {
        opActualData[i] = {"x": Duration[i], "y": actualData[i]}
    }

    const data = {
    datasets: [{
        display: true,
        label: 'Actual Current',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 255)',
        data: opActualData,
        showLine: true
        },
        {
        display: true,
        label: 'Normal Current',
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
        data: opNormalData,
        showLine: true
    }
    ]
    };   

    const config = {
    type: 'scatter',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: title,
                font: {size: 30}
            }
        },
        scales: {
        xAxes: {
            display: true,
            title: {
            display: true,
            text: 'Time (s)'
            },
            suggestedMin: 0,
        },
        yAxes: {
            display: true,
            title:{
            display: true,
            text: 'Current (A)'
            }            
        }
        }
    }
    };

    recordChart = new Chart(
    document.getElementById("myChart"),
    config
    );
};

async function analysisChart(){
    if (anaChart != (undefined)){
        anaChart.destroy();
    }
    if (recordChart != undefined){
        recordChart.destroy();
    }

    var dateTime = await eel.returnTime()();
    var recordDate = dateTime[0];
    var recordTime = dateTime[1];

    var labels = new Array(10)
    labels.fill(0, 0, 10)    //Fill array with 0
    for (let i = 0; i < labels.length; i++) {
        labels[i] = String(recordDate[labels.length - i - 1]) + '.' + String(recordTime[labels.length - i - 1]);
    }

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

    var opYaxis;

    if (document.getElementById('toCheck').value == "Maximum Current"){
        opData = maxAdata;
        opYaxis = 'Current (A)';
    }
    if (document.getElementById('toCheck').value == "Steady State Current"){
        opData = SteadyAdata;
        opYaxis = 'Current (A)';
    }   
    if (document.getElementById('toCheck').value == "Operating Time"){
        opData = durationTime;
        opYaxis = 'Time (s)';
    }

    const config = {
    type: 'line',
    data: opData,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Last 10 ' + document.getElementById('toCheck').value + ' of ' + document.getElementById('AttributePMID').value ,
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
                text: opYaxis
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
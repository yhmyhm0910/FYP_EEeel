let latestData, latestPMID

setInterval(RTupDate, 1000);    // 1s run say_something one time
async function RTupDate(){
    latestData = await eel.actualCurrent()();
    latestPMID = await eel.PMID()();
    document.getElementById("return").innerHTML = latestData;
    document.getElementById("return2").innerHTML = latestPMID;
}

eel.expose(js_bigger);  //js function to py template
function js_bigger(count){   
    return [123, 456, 789]
}

let normalData, actualData, PMID, myChart, myChart_A, myChart_B, currentPMStatus, currentPMStatus_A //globalize

async function RTupDate_chart_2(){    //for double charts

    var labels = new Array(34) 
    labels[0] = 0;
    labels[1] = 0.06;
    labels[2] = 0.1,
    labels[3] = 0.15;
    labels[4] = 0.2;
    labels[5] = 0.25;
    labels[6] = 0.3;
    labels[7] = 0.35;
    labels[8] = 0.4;
    labels[9] = 0.45;
    labels[10] = 0.8;
    labels[11] = 1.0;
    labels[12] = 1.5;
    labels[13] = 2.1;
    labels[14] = 2.4;
    labels[15] = 4.2;
    labels[16] = 4.4;
    labels[17] = 4.6;
    labels[18] = 4.8;
    labels[19] = 5.0;
    labels[20] = 5.2;
    labels[21] = 5.4;
    labels[22] = 5.6;
    labels[23] = 5.8;
    labels[24] = 6.0;
    labels[25] = 6.2;
    labels[26] = 6.4;
    labels[27] = 7.0;
    labels[28] = 8.0;
    labels[29] = 9.0;
    labels[30] = 10.0;
    labels[31] = 11.9;
    labels[32] = 12.0;
    labels[33] = 12.1;

    let normalData = await eel.normalCurrent()();
    let actualData_A = await eel.actualCurrent_A()();
    let actualData_B = await eel.actualCurrent()();

    let PMID_A = await eel.PMID_A()();
    let PMID_B = await eel.PMID()();
    PMID = PMID_B;

    var title_A =  PMID_A + ' - ' + await eel.RDate_A()() + ' - ' + await eel.RTime_A()();
    var title_B =  PMID_B + ' - ' + await eel.RDate()() + ' - ' + await eel.RTime()();

    var opNormalData = new Array(34)
    for (let i = 0; i < opNormalData.length ; i++) {
        opNormalData[i] = {"x": labels[i], "y": normalData[i]}
    }

    var opActualData_A = new Array(34)
    for (let i = 0; i < opActualData_A.length ; i++) {
        opActualData_A[i] = {"x": labels[i], "y": actualData_A[i]}
    }

    var opActualData_B = new Array(34)
    for (let i = 0; i < opActualData_B.length ; i++) {
        opActualData_B[i] = {"x": labels[i], "y": actualData_B[i]}
    }

    var data_A = {
    datasets: [{
        display: true,
        label: 'Actual Current',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 255)',
        data: opActualData_A,
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

    var data_B = {
        datasets: [{
            display: true,
            label: 'Actual Current',
            backgroundColor: 'rgb(0, 0, 255)',
            borderColor: 'rgb(0, 0, 255)',
            data: opActualData_B,
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

    const config_A = {
    type: 'scatter',
    data: data_A,
    options: {
        plugins: {
            title: {
                display: true,
                text: title_A,
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

    const config_B = {
        type: 'scatter',
        data: data_B,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title_B,
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

    myChart_A = new Chart(
    document.getElementById("myChart_A"),
    config_A
    );
    myChart_B = new Chart(
    document.getElementById("myChart_B"),
    config_B
    );
};

async function RTupDate_chart(){    //Single graph

    var labels = new Array(34) 
    labels[0] = 0;
    labels[1] = 0.06;
    labels[2] = 0.1,
    labels[3] = 0.15;
    labels[4] = 0.2;
    labels[5] = 0.25;
    labels[6] = 0.3;
    labels[7] = 0.35;
    labels[8] = 0.4;
    labels[9] = 0.45;
    labels[10] = 0.8;
    labels[11] = 1.0;
    labels[12] = 1.5;
    labels[13] = 2.1;
    labels[14] = 2.4;
    labels[15] = 4.2;
    labels[16] = 4.4;
    labels[17] = 4.6;
    labels[18] = 4.8;
    labels[19] = 5.0;
    labels[20] = 5.2;
    labels[21] = 5.4;
    labels[22] = 5.6;
    labels[23] = 5.8;
    labels[24] = 6.0;
    labels[25] = 6.2;
    labels[26] = 6.4;
    labels[27] = 7.0;
    labels[28] = 8.0;
    labels[29] = 9.0;
    labels[30] = 10.0;
    labels[31] = 11.9;
    labels[32] = 12.0;
    labels[33] = 12.1;

    normalData = await eel.normalCurrent()();
    actualData = await eel.actualCurrent()();
    PMID = await eel.PMID()();
    var title =  PMID + ' - ' + await eel.RDate()() + ' - ' + await eel.RTime()();


    var opNormalData = new Array(34)
    for (let i = 0; i < opNormalData.length ; i++) {
        opNormalData[i] = {"x": labels[i], "y": normalData[i]}
    }

    var opActualData = new Array(34)
    for (let i = 0; i < opActualData.length ; i++) {
        opActualData[i] = {"x": labels[i], "y": actualData[i]}
    }

    var data = {
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

    myChart = new Chart(
    document.getElementById("myChart"),
    config
    );
};

let myInterval
function setInterval_f(){
    myInterval = setInterval(changeChart,3000);
}

setInterval_f();
let ini = 0;
async function changeChart(){
    if (ini == 0){      //Run RTupDate_chart for 1st time
        RTupDate_chart();
        ini = 1;
    };

    if (JSON.stringify(PMID) != JSON.stringify(latestPMID)){  //after JSON.stingify they will be the same
        PMID = await eel.PMID()();  //for sync

        PMID = latestPMID;  //for sync
        if (latestPMID.includes('A')) {     //if two graphs
            console.log('Found A');
            clearInterval(myInterval);
            waitingB = setInterval(waitB, 1000);
                function waitB(){
                console.log('Waiting B');
                if (latestPMID.includes('B')){
                    //window.setInterval(changeChart, 3000);
                    clearInterval(waitingB);
                    setInterval_f();
                    if (myChart != undefined){
                        myChart.destroy();}
                    if (myChart_A != undefined){
                        myChart_A.destroy();}
                    if (myChart_B != undefined){
                        myChart_B.destroy();}
                    RTupDate_chart_2();
                }}
            
        } else  {
            if (myChart != undefined){
                myChart.destroy();}
            if (myChart_A != undefined){
                myChart_A.destroy();}
            if (myChart_B != undefined){
                myChart_B.destroy();}

            currentPMStatus = await eel.diagnosticUnit()();

            for (let i = 0; i < currentPMStatus.length ; i++) {
                if (currentPMStatus[i] == 3){
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "red";
                            document.getElementById("latestOperationA").innerHTML = "Alarm [" + PMID + " - MaxA exceeds]"; 
                            break;
                        case 2:
                            latestOperationB.style.color = "red";
                            document.getElementById("latestOperationB").innerHTML = "Alarm [" + PMID + " - Steady Current exceeds]";
                            break;
                        case 4:
                            latestOperationC.style.color = "red";
                            document.getElementById("latestOperationC").innerHTML = "Alarm [" + PMID + " - Time exceeds]";  
                    }
 
                }
                if (currentPMStatus[i] == 2){
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "orange";
                            document.getElementById("latestOperationA").innerHTML = "Alert [" + PMID + " - MaxA exceeds]"; 
                            break;
                        case 2:
                            latestOperationB.style.color = "orange";
                            document.getElementById("latestOperationB").innerHTML = "Alert [" + PMID + " - Steady Current exceeds]";
                            break;
                        case 4:
                            latestOperationC.style.color = "orange";
                            document.getElementById("latestOperationC").innerHTML = "Alert [" + PMID + " - Time exceeds]"; 
                            break; 
                    }
                }
                if (currentPMStatus[i] == 1){
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "green";
                            document.getElementById("latestOperationA").innerHTML = "Normal MaxA";
                            break;
                        case 2:
                            latestOperationB.style.color = "green";
                            document.getElementById("latestOperationB").innerHTML = "Normal Steady Current]";
                            break;
                        case 4:
                            latestOperationC.style.color = "green";
                            document.getElementById("latestOperationC").innerHTML = "Normal Time]"; 
                            break; 
                    }

                }
            }

            RTupDate_chart();
        }  //if one graph
    };
console.log(PMID);    //for testing
console.log(latestPMID);        //for testing
}


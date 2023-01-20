let shownData, latestPMID

setInterval(RTupDate, 1000);    // 1s run say_something one time
async function RTupDate(){
    shownData = await eel.actualCurrent()();
    latestPMID = await eel.PMID()();
}

eel.expose(js_bigger);  //js function to py template
function js_bigger(count){   
    return [123, 456, 789]
}

let normalData, actualData, PMID, myChart, myChart_A, myChart_B, currentPMStatus, currentPMStatus_A, labels, PMID_A //globalize
labels = new Array(34) 
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

async function RTupDate_chart_2(){    //for double charts

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
async function changeChart(){
    if (JSON.stringify(PMID) != JSON.stringify(latestPMID)){  //after JSON.stingify they will be the same
        PMID = await eel.PMID()();  //for sync

        PMID = latestPMID;  //for sync
        if (latestPMID.includes('A')) {     //if two graphs
            console.log('Found A');
            clearInterval(myInterval);
            waitingB = setInterval(waitB, 1000);
            async function waitB(){
                console.log('Waiting B');
                if (latestPMID.includes('B')){
                    clearInterval(waitingB);
                    setInterval_f();
                    if (myChart != undefined){
                        myChart.destroy();}
                    if (myChart_A != undefined){
                        myChart_A.destroy();}
                    if (myChart_B != undefined){
                        myChart_B.destroy();}
                    RTupDate_chart_2();     //for graph drawing (2 graphs)

                    var noDiv = document.getElementById("div");
                    noDiv.style.display = "none";
                    var Div1 = document.getElementById("div1");
                    Div1.style.display = "block";
                    var Div2 = document.getElementById("div2");
                    Div2.style.display = "block";
                    var showTable = document.getElementById("table2");
                    showTable.style.display = "block";

                    currentPMStatus = await eel.diagnosticUnit()(); 
                    var latestData_A = await eel.actualCurrent_A()();
                    var latestData = await eel.actualCurrent()();

                    for (let i = 0; i < currentPMStatus.length ; i++) {     //for status bar (2 graphs)
                        if (currentPMStatus[i] == 3){   // == Alarm
                            switch (i){
                                case 0:     //MaxB
                                    latestOperationA_2.style.color = "red";
                                    document.getElementById("latestOperationA_2").innerHTML = "Alarm - exceeds";
                                    latestMaxA_2.style.color = "red";
                                    document.getElementById("latestMaxA_2").innerHTML = (latestData[1] + latestData[2])/2 + 'A'; 
                                    break;
                                case 1:     //MaxA
                                    latestOperationA.style.color = "red";
                                    document.getElementById("latestOperationA").innerHTML = "Alarm - exceeds";
                                    latestMaxA.style.color = "red";
                                    document.getElementById("latestMaxA").innerHTML = (latestData_A[1] + latestData_A[2])/2 + 'A'; 
                                    break;
                                case 2:     //SteadyB
                                    latestOperationB_2.style.color = "red";
                                    document.getElementById("latestOperationB_2").innerHTML = "Alarm - exceeds";
                                    latestSteadyA_2.style.color = "red";
                                    document.getElementById("latestSteadyA_2").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                                    break;
                                case 3:     //SteadyA
                                    latestOperationB.style.color = "red";
                                    document.getElementById("latestOperationB").innerHTML = "Alarm - exceeds";
                                    latestSteadyA.style.color = "red";
                                    document.getElementById("latestSteadyA").innerHTML = (latestData_A[10] + latestData_A[11] + latestData_A[12] + latestData_A[13] + latestData_A[14])/5 + 'A';
                                    break;
                                case 4:     //DurationB
                                    latestOperationC_2.style.color = "red";
                                    document.getElementById("latestOperationC_2").innerHTML = "Alarm - exceeds";
                                    latestTime_2.style.color = "red";
                                    var diagDuration;
                                    for (let i = 1; i < (latestData.length) ; i++) {
                                        if (latestData[i] == 0){
                                            diagDuration = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime_2").innerHTML = diagDuration + "s";
                                    break;  
                                case 5:     //DurationA
                                    latestOperationC.style.color = "red";
                                    document.getElementById("latestOperationC").innerHTML = "Alarm - exceeds";
                                    latestTime.style.color = "red";
                                    var diagDuration_A;
                                    for (let i = 1; i < (latestData_A.length) ; i++) {
                                        if (latestData_A[i] == 0){
                                            diagDuration_A = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime").innerHTML = diagDuration_A + "s";
                                    break; 
                            }
                        }
                        if (currentPMStatus[i] == 2){   // == Alert
                            switch (i){
                                case 0:     //MaxB
                                    latestOperationA_2.style.color = "orange";
                                    document.getElementById("latestOperationA_2").innerHTML = "Alert - exceeds"; 
                                    latestMaxA_2.style.color = "orange";
                                    document.getElementById("latestMaxA_2").innerHTML = (latestData[1] + latestData[2])/2 + 'A';
                                    break;
                                case 1:     //MaxA
                                    latestOperationA.style.color = "orange";
                                    document.getElementById("latestOperationA").innerHTML = "Alert - exceeds";
                                    latestMaxA.style.color = "orange";
                                    document.getElementById("latestMaxA").innerHTML = (latestData_A[1] + latestData_A[2])/2 + 'A'; 
                                    break;
                                case 2:     //SteadyB
                                    latestOperationB_2.style.color = "orange";
                                    document.getElementById("latestOperationB_2").innerHTML = "Alert - exceeds";
                                    latestSteadyA_2.style.color = "orange";
                                    document.getElementById("latestSteadyA_2").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                                    break;
                                case 3:     //SteadyA
                                    latestOperationB.style.color = "orange";
                                    document.getElementById("latestOperationB").innerHTML = "Alert - exceeds";
                                    latestSteadyA.style.color = "orange";
                                    document.getElementById("latestSteadyA").innerHTML = (latestData_A[10] + latestData_A[11] + latestData_A[12] + latestData_A[13] + latestData_A[14])/5 + 'A';
                                    break;
                                case 4:     //DurationB
                                    latestOperationC_2.style.color = "orange";
                                    document.getElementById("latestOperationC_2").innerHTML = "Alert - exceeds";
                                    latestTime_2.style.color = "orange";
                                    var diagDuration;
                                    for (let i = 1; i < (latestData.length) ; i++) {
                                        if (latestData[i] == 0){
                                            diagDuration = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime_2").innerHTML = diagDuration + "s"; 
                                    break; 
                                case 5:     //DurationA
                                    latestOperationC.style.color = "orange";
                                    document.getElementById("latestOperationC").innerHTML = "Alert - exceeds";
                                    latestTime.style.color = "orange";
                                    var diagDuration_A;
                                    for (let i = 1; i < (latestData_A.length) ; i++) {
                                        if (latestData_A[i] == 0){
                                            diagDuration_A = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime").innerHTML = diagDuration_A + "s";
                                    break; 
                            }
                        }
                        if (currentPMStatus[i] == 1){   // == Normal
                            switch (i){
                                case 0:
                                    latestOperationA_2.style.color = "green";
                                    document.getElementById("latestOperationA_2").innerHTML = "Normal Max. Current";
                                    latestMaxA_2.style.color = "green";
                                    document.getElementById("latestMaxA_2").innerHTML = (latestData[1] + latestData[2])/2 + 'A';
                                    break;
                                case 1:     //MaxA
                                    latestOperationA.style.color = "green";
                                    document.getElementById("latestOperationA").innerHTML = "Normal Max. Current";
                                    latestMaxA.style.color = "green";
                                    document.getElementById("latestMaxA").innerHTML = (latestData_A[1] + latestData_A[2])/2 + 'A'; 
                                    break;
                                case 2:
                                    latestOperationB_2.style.color = "green";
                                    document.getElementById("latestOperationB_2").innerHTML = "Normal Steady Current";
                                    latestSteadyA_2.style.color = "green";
                                    document.getElementById("latestSteadyA_2").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                                    break;
                                case 3:     //SteadyA
                                    latestOperationB.style.color = "green";
                                    document.getElementById("latestOperationB").innerHTML = "Normal Steady Current";
                                    latestSteadyA.style.color = "green";
                                    document.getElementById("latestSteadyA").innerHTML = (latestData_A[10] + latestData_A[11] + latestData_A[12] + latestData_A[13] + latestData_A[14])/5 + 'A';
                                    break;
                                case 4:
                                    latestOperationC_2.style.color = "green";
                                    document.getElementById("latestOperationC_2").innerHTML = "Normal Time"; 
                                    latestTime_2.style.color = "green";
                                    var diagDuration;
                                    for (let i = 1; i < (latestData.length) ; i++) {
                                        if (latestData[i] == 0){
                                            diagDuration = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime_2").innerHTML = diagDuration + "s";
                                    break; 
                                case 5:     //DurationA
                                    latestOperationC.style.color = "green";
                                    document.getElementById("latestOperationC").innerHTML = "Normal Time";
                                    latestTime.style.color = "green";
                                    var diagDuration_A;
                                    for (let i = 1; i < (latestData_A.length) ; i++) {
                                        if (latestData_A[i] == 0){
                                            diagDuration_A = labels[i];
                                            break;
                                        }
                                    }
                                    document.getElementById("latestTime").innerHTML = diagDuration_A + "s";
                                    break; 
                            }      //end of switch
                        }   //end of normal
                    }   //end of for loop (check status)
                    let printed_A;
                    printed_A = false;
                    normal_A = false;
                    document.getElementById("faultPresent").innerHTML = " ";
                    if (currentPMStatus[1] > 1 && currentPMStatus[3] > 1){  //point with sticky chair (PM_A)
                        printed_A = true;
                        if (currentPMStatus[1] == 3 || currentPMStatus[3] == 3){    //Alarm
                            faultPresent.style.color = "red";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "ALARM! Point with Sticky Chair";
                        }
                        else {
                            faultPresent.style.color = "orange";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "Alert: Point with Sticky Chair";
                        }
                    }
                    if (currentPMStatus[3] > 1 && currentPMStatus[5] > 1){  //print obstuction (PM_A)
                        printed_A = true;
                        if (currentPMStatus[3] == 3 || currentPMStatus[5] == 3){    //Alert
                            faultPresent.style.color = "red";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "ALARM! Point Encounters Obstruction";
                        }
                        else {
                            faultPresent.style.color = "orange";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "Alert: Point Encounters Obstruction";
                        }
                    }
                    if (currentPMStatus[3] == 1 && currentPMStatus[5] > 1){  //print fails to lock (PM_A)
                        printed_A = true;
                        if (currentPMStatus[5] == 3){    //Alert
                            faultPresent.style.color = "red";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "ALARM! Point Fails to Lock";
                        }
                        else {
                            faultPresent.style.color = "orange";
                            document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "Alert: Point Fails to Lock";
                        }
                    }
                    if (printed_A == false){  //Normal_A
                        normal_A = true;
                        faultPresent.style.color = "green";
                        document.getElementById("faultPresent").innerHTML = "[" + await eel.PMID_A()() + "] " + "Normal Operating";
                    }
                    if (normal_A == false){   //record detected fault
                        var table = document.getElementById("recordTable");
                        var row = table.insertRow(1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = await eel.PMID_A()() + ' - ' + await eel.RDate_A()() + ' - ' + await eel.RTime_A()();
                        cell2.innerHTML = document.getElementById("faultPresent").innerHTML;
                    }
                    let printed_B;
                    normal_B = false;
                    printed_B = false;
                    if (currentPMStatus[0] > 1 && currentPMStatus[2] > 1){  //point with sticky chair
                        printed_B = true;
                        if (currentPMStatus[0] == 3 || currentPMStatus[2] == 3){    //Alarm
                            faultPresent_2.style.color = "red";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "ALARM! Point with Sticky Chair";
                        }
                        else {  //alert
                            faultPresent_2.style.color = "orange";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "Alert: Point with Sticky Chair";
                        }
                    }
                    if (currentPMStatus[2] > 1 && currentPMStatus[4] > 1){  //print obstruction
                        printed_B = true;
                        if (currentPMStatus[2] == 3 || currentPMStatus[4] == 3){    //Alarm
                            faultPresent_2.style.color = "red";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "ALARM! Point Encounters Obstruction";
                        }
                        else {  //alert
                            faultPresent_2.style.color = "orange";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "Alert: Point Encounters Obstruction";
                        }
                    }
                    if (currentPMStatus[2] == 1 && currentPMStatus[4] > 1){  //point fails to lock
                        printed_B = true;
                        if (currentPMStatus[4] == 3){    //Alarm
                            faultPresent_2.style.color = "red";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "ALARM! Point Fails to Lock";
                        }
                        else {  //alert
                            faultPresent_2.style.color = "orange";
                            document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "Alert: Point Fails to Lock";
                        }
                    }
                    if (printed_B == false){  //Normal
                        normal_B = true;
                        faultPresent_2.style.color = "green";
                        document.getElementById("faultPresent_2").innerHTML = "[" + await eel.PMID()() + "] " + "Normal Operating";
                    }
                    if (normal_B == false){   //record detected fault
                        var table = document.getElementById("recordTable");
                        var row = table.insertRow(1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = await eel.PMID()() + ' - ' + await eel.RDate()() + ' - ' + await eel.RTime()();;
                        cell2.innerHTML = document.getElementById("faultPresent_2").innerHTML;
                    }
                }   //end of if (latestPMID.includes('B'))
            }   //end of wait b
        }   // end of if (latestPMID.includes('A')) 
        
        else  if (latestPMID.includes('B') == false){       //one graph
            if (myChart != undefined){
                myChart.destroy();}
            if (myChart_A != undefined){
                myChart_A.destroy();}
            if (myChart_B != undefined){
                myChart_B.destroy();}

            currentPMStatus = await eel.diagnosticUnit()();     
            var latestData = await eel.actualCurrent()();
            
            var noTable = document.getElementById("table2");
            noTable.style.display = "none";
            var noDiv1 = document.getElementById("div1");
            noDiv1.style.display = "none";
            var noDiv2 = document.getElementById("div2");
            noDiv2.style.display = "none";
            var showDiv = document.getElementById("div");
            showDiv.style.display = "block";

            for (let i = 0; i < currentPMStatus.length ; i++) {     //for status bar (1 graph)
                if (currentPMStatus[i] == 3){   // == Alarm
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "red";
                            document.getElementById("latestOperationA").innerHTML = "Alarm - exceeds";
                            latestMaxA.style.color = "red";
                            document.getElementById("latestMaxA").innerHTML = (latestData[1] + latestData[2])/2 + 'A'; 
                            break;
                        case 2:
                            latestOperationB.style.color = "red";
                            document.getElementById("latestOperationB").innerHTML = "Alarm - exceeds";
                            latestSteadyA.style.color = "red";
                            document.getElementById("latestSteadyA").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                            break;
                        case 4:
                            latestOperationC.style.color = "red";
                            document.getElementById("latestOperationC").innerHTML = "Alarm - exceeds";
                            latestTime.style.color = "red";
                            var diagDuration;
                            for (let i = 1; i < (latestData.length) ; i++) {
                                if (latestData[i] == 0){
                                    diagDuration = labels[i];
                                    break;
                                }
                            }
                            document.getElementById("latestTime").innerHTML = diagDuration + "s";
                            break;  
                    }
                }
                if (currentPMStatus[i] == 2){   // == Alert
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "orange";
                            document.getElementById("latestOperationA").innerHTML = "Alert - exceeds"; 
                            latestMaxA.style.color = "orange";
                            document.getElementById("latestMaxA").innerHTML = (latestData[1] + latestData[2])/2 + 'A';
                            break;
                        case 2:
                            latestOperationB.style.color = "orange";
                            document.getElementById("latestOperationB").innerHTML = "Alert - exceeds";
                            latestSteadyA.style.color = "orange";
                            document.getElementById("latestSteadyA").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                            break;
                        case 4:
                            latestOperationC.style.color = "orange";
                            document.getElementById("latestOperationC").innerHTML = "Alert - exceeds";
                            latestTime.style.color = "orange";
                            var diagDuration;
                            for (let i = 1; i < (latestData.length) ; i++) {
                                if (latestData[i] == 0){
                                    diagDuration = labels[i];
                                    break;
                                }
                            }
                            document.getElementById("latestTime").innerHTML = diagDuration + "s"; 
                            break; 
                    }
                }
                if (currentPMStatus[i] == 1){   // == Normal
                    switch (i){
                        case 0:
                            latestOperationA.style.color = "green";
                            document.getElementById("latestOperationA").innerHTML = "Normal Max. Current";
                            latestMaxA.style.color = "green";
                            document.getElementById("latestMaxA").innerHTML = (latestData[1] + latestData[2])/2 + 'A';
                            break;
                        case 2:
                            latestOperationB.style.color = "green";
                            document.getElementById("latestOperationB").innerHTML = "Normal Steady Current";
                            latestSteadyA.style.color = "green";
                            document.getElementById("latestSteadyA").innerHTML = (latestData[10] + latestData[11] + latestData[12] + latestData[13] + latestData[14])/5 + 'A';
                            break;
                        case 4:
                            latestOperationC.style.color = "green";
                            document.getElementById("latestOperationC").innerHTML = "Normal Time"; 
                            latestTime.style.color = "green";
                            var diagDuration;
                            for (let i = 1; i < (latestData.length) ; i++) {
                                if (latestData[i] == 0){
                                    diagDuration = labels[i];
                                    break;
                                }
                            }
                            document.getElementById("latestTime").innerHTML = diagDuration + "s";
                            break; 
                    }
                }
            }

            let printed, normal;
            printed = false;
            normal = false;
            document.getElementById("faultPresent_2").innerHTML = ' ';
            if (currentPMStatus[0] > 1 && currentPMStatus[2] > 1){  //Point with Sticky Chair
                printed = true;
                if (currentPMStatus[0] == 3 || currentPMStatus[2] == 3){    //Alarm
                    faultPresent.style.color = "red";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] ALARM! Point with Sticky Chair");
                }
                else {  //Alert
                    faultPresent.style.color = "orange";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] Alert: Point with Sticky Chair");
                }
            }
            if (currentPMStatus[2] > 1 && currentPMStatus[4] > 1){  //Point Encounters Obstruction
                printed = true;
                if (currentPMStatus[2] == 3 || currentPMStatus[4] == 3){    //Alarm
                    faultPresent.style.color = "red";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] ALARM! Point Encounters Obstruction");
                }
                else {  //Alert
                    faultPresent.style.color = "orange";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] Alert: Point Encounters Obstruction");
                }
            }
            if (currentPMStatus[2] == 1 && currentPMStatus[4] > 1){  //Point Fails to Lock
                printed = true;
                if (currentPMStatus[4] == 3){    //Alarm
                    faultPresent.style.color = "red";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] ALARM! Point Fails to Lock");
                }
                else {  //Alert
                    faultPresent.style.color = "orange";
                    document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] Alert: Point Fails to Lock");
                }
            }
            if (printed == false){  //Normal
                normal = true;
                faultPresent.style.color = "green";
                document.getElementById("faultPresent").innerHTML = ("[" + PMID + "] Normal Operating");
            }
            if (normal == false){   //record detected fault
                var table = document.getElementById("recordTable");
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = PMID + ' - ' + await eel.RDate()() + ' - ' + await eel.RTime()();
                cell2.innerHTML = document.getElementById("faultPresent").innerHTML;
            }

            RTupDate_chart();       //for drawing (1 graph)
        }  //if one graph
    };
console.log(PMID);    //for testing
console.log(latestPMID);        //for testing
}


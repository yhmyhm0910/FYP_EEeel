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
    //改變<p>tag 文字的大小     
    document.querySelector('p').style.fontSize = count ;
}

let normalData, actualData, PMID //globalize

async function RTupDate_chart(){

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

    let myChart = new Chart(
    document.getElementById("myChart"),
    config
    );
    
    setInterval(changeChart,1000);
    function changeChart(){
        if (JSON.stringify(PMID) != JSON.stringify(latestPMID)){  //after JSON.stingify they will be the same
        myChart.destroy();
        RTupDate_chart();
        }
    console.log(PMID);    //for testing
    console.log(latestPMID);        //for testing
    }
    };


RTupDate_chart();

async function chooseGraph(){
    var PMID = await eel.PMID()();
    console.log(PMID);
    if (PMID.includes('A') || PMID.includes('B')) {
        console.log("The word Example is in the string.");
    } else {
        console.log("The word Example is not in the string");
    }
}
chooseGraph()

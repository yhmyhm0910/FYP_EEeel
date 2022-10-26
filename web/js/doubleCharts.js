var labels = new Array(101)   //Initiate array lengths 101 (0-100)
labels.fill(0, 0, 101)    //Fill array with 0
for (let i = 0; i < labels.length; i++) {
    labels[i] = i/10;
}

var trialdata = new Array(101)                            
trialdata.fill(0, 0, 101)    //Fill array with 0
for (let i = 0; i < trialdata.length; i++) {
    trialdata[i] = i;
}   

var trialdata2 = new Array(101)                            
trialdata2.fill(0, 0, 101)    //Fill array with 0
for (let i = 0; i < trialdata2.length; i++) {
    trialdata2[i] = i/2;
}     

var data = {
labels: labels,
datasets: [{
    display: true,
    label: 'Normal Current',
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(0, 0, 0)',
    data: trialdata,
},
{
    display: true,
    label: 'Actual Current',
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor: 'rgb(0, 0, 255)',
    data: trialdata2,
}
]
};   

const config = {
type: 'line',
data: data,
options: {
    plugins: {
        title: {
            display: true,
            text: '671A - 20221013 - 1710',
            font: {size: 30}
        }
    },
    scales: {
    x: {
        display: true,
        title:{
        display: true,
        text: 'Times (s)'
        },
        suggestedMin: 0,
        suggestedMax: 10
    },
    y: {
        display: true,
        title:{
        display: true,
        text: 'Current (A)'
        }            
    }
    }
}
};

const config2 = {
type: 'line',
data: data,
options: {
    plugins: {
        title: {
            display: true,
            text: '671B - 20221013 - 1710',
            font: {size: 30}
        }
    },
    scales: {
    x: {
        display: true,
        title:{
        display: true,
        text: 'Times (s)'
        },
        suggestedMin: 0,
        suggestedMax: 10
    },
    y: {
        display: true,
        title:{
        display: true,
        text: 'Current (A)'
        }            
    }
    }
}
};

const myChart = new Chart(
document.getElementById('myChart'),
config
);

const myChart2 = new Chart(
document.getElementById('myChart2'),
config2
);
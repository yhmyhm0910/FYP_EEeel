from typing import final
import pyodbc   #database usage
import re   #extract decimals from list
import time

i=0
while i < 20:
    print (i)
    i += 1
    




'''
    <div>
    <h2>
        <span style="color:rgb(0, 0, 0)">Previous Faults Faced: </span>
        <span style="color:green"> None </span>
        <span style="color:orange">/ Alert [672 - Sticky Sliding Chair]</span>
        <span style="color:red">, Alarm [671B - Sticky Sliding Chair] </span>
    </h2>
    </div>
    <div>
    <h2>
        <span style="color:rgb(0, 0, 0)">Latest Operation: </span>
        <span style="color:green"> Normal </span>
        <span style="color:orange">/ Alert [672 - Sticky Sliding Chair]</span>
        <span style="color:red">/ Alarm [671B - Sticky Sliding Chair] </span>
    </h2>
    </div>
    <div>
    <h2>
        <span style="color:rgb(0, 0, 0)">Last 10 Operations of 671A: </span>
        <span style="color:green"> Normal </span>
        <span style="color:orange">/ Alert [Sticky Sliding Chair]</span>
        <span style="color:red">/ Alarm [Sticky Sliding Chair]</span>
    </h2>
    </div>
    <div style="width: 100%;">
        <div class="chartBox" style="width: 50%; height: 100%; float: left;">
            <canvas id="myChart"></canvas>
        </div>
        <div class="chartBox" style="margin-left: 50%; width: 50%; height: 100%;">
            <canvas id="myChart2"></canvas>
        </div>
    </div>
'''
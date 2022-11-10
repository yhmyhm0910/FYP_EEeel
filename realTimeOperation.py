#https://neutron0916.medium.com/python-eel-%E5%89%B5%E9%80%A0%E5%80%8B%E4%BA%BA%E7%B6%B2%E9%A0%81gui%E6%A1%8C%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-%E5%85%A5%E9%96%80%E7%AF%87-2500b38ed070
import eel
import re   #extract decimals from list
import time
import pyodbc   #database usage
server = 'yhmyhm0910.database.windows.net'  #Database connection is putted here as pages need to use conn (it is global here)
database = 'freeDB'
username = "19060016d@connect.polyu.hk"
password = '{Nelsonzz9}'   
driver= '{ODBC Driver 17 for SQL Server}'
Authentication='ActiveDirectoryPassword' #This is so very important, @connect.polyu.hk issue https://github.com/mkleehammer/pyodbc/issues/1008
conn = pyodbc.connect(
    'AUTHENTICATION='+Authentication+
    ';DRIVER='+driver+
    ';SERVER='+server+
    ';PORT=1433;DATABASE='+database+
    ';UID='+username+
    ';PWD='+ password
) 
global cursor
cursor = conn.cursor()


@eel.expose 
def normalCurrent():
    cursor.execute("SELECT TOP 1 Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8, Data9, Data10,Data11, Data12, Data13, Data14, Data15, Data16, Data17, Data18, Data19, Data20, Data21, Data22, Data23, Data24,Data25, Data26, Data27, Data28, Data29, Data30, Data31, Data32, Data33, Data34 FROM Records ORDER BY (str(RDate) + str(RTime)) ASC;")
    initialResult = str(cursor.fetchall())
    finalResult = ['0'] * 34
    finalResult = re.findall('\d*\.?\d+',initialResult)
    for i in range(len(finalResult)):
        finalResult[i] = float(finalResult[i])
      
    #eel.js_bigger(f'{1}rem')    #js function to py template
    
    return (finalResult)

@eel.expose 
def actualCurrent():
    cursor.execute("SELECT TOP 1 Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8, Data9, Data10,Data11, Data12, Data13, Data14, Data15, Data16, Data17, Data18, Data19, Data20, Data21, Data22, Data23, Data24,Data25, Data26, Data27, Data28, Data29, Data30, Data31, Data32, Data33, Data34 FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialResult = str(cursor.fetchall())
    finalResult = ['0'] * 34
    finalResult = re.findall('\d*\.?\d+',initialResult)
    for i in range(len(finalResult)):
        finalResult[i] = float(finalResult[i])
    return finalResult

@eel.expose
def actualCurrent_A():  #When passed TWO PMs, select the current of A
    cursor.execute("SELECT TOP 1 Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8, Data9, Data10,Data11, Data12, Data13, Data14, Data15, Data16, Data17, Data18, Data19, Data20, Data21, Data22, Data23, Data24,Data25, Data26, Data27, Data28, Data29, Data30, Data31, Data32, Data33, Data34 FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialResult = str(cursor.fetchall())
    finalResult = ['0'] * 34
    finalResult = re.findall('\d*\.?\d+',initialResult)
    for i in range(len(finalResult)):
        finalResult[i] = float(finalResult[i])
    return finalResult


@eel.expose
def RTime():
    cursor.execute("SELECT TOP 1 RTime FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRTime = str(cursor.fetchall())
    finalRTime = [0]
    finalRTime = re.findall(r'\d+',initialRTime)
    return str(finalRTime[0])

@eel.expose
def RTime_A():  #When passed TWO PMs, select the RTime of A
    cursor.execute("SELECT TOP 1 RTime FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRTime = str(cursor.fetchall())
    finalRTime = [0]
    finalRTime = re.findall(r'\d+',initialRTime)
    return str(finalRTime[0])

@eel.expose
def RDate():
    cursor.execute("SELECT TOP 1 RDate FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRDate = str(cursor.fetchall())
    finalRDate = [0]
    finalRDate = re.findall(r'\d+',initialRDate)
    return str(finalRDate[0])

@eel.expose
def RDate_A():    #When passed TWO PMs, select the RDate of A
    cursor.execute("SELECT TOP 1 RDate FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRDate = str(cursor.fetchall())
    finalRDate = [0]
    finalRDate = re.findall(r'\d+',initialRDate)
    return str(finalRDate[0])

@eel.expose
def PMID():
    cursor.execute("SELECT TOP 1 PMID FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialPMID = str(cursor.fetchall())
    finalPMID = [0]
    finalPMID = re.findall("[a-zA-Z0-9]+",initialPMID)
    if (("A" in finalPMID[0]) | ("B" in finalPMID[0])):
        print ("contain")    #To BE ACTION
    return str(finalPMID[0])

@eel.expose
def PMID_A():     #When passed TWO PMs, select the PMID of A
    cursor.execute("SELECT TOP 1 PMID FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialPMID = str(cursor.fetchall())
    finalPMID = [0]
    finalPMID = re.findall("[a-zA-Z0-9]+",initialPMID)
    if (("A" in finalPMID[0]) | ("B" in finalPMID[0])):
        print ("contain")    #To BE ACTION
    return str(finalPMID[0])

@eel.expose
def diagnosticUnit():       # return 3 = ALARM; return 2 = ALERT; return 1 = NORMAL
    
    def fetchMaxCurrent():
        cursor.execute("SELECT TOP 1 Data2, Data3 FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
        initialMaxCurrent = str(cursor.fetchall())
        finalMaxCurrent = ['0'] * 2
        finalMaxCurrent = re.findall('\d*\.?\d+',initialMaxCurrent)
        for i in range(len(finalMaxCurrent)):
            finalMaxCurrent[i] = float(finalMaxCurrent[i])
        if (finalMaxCurrent[0] >= 12) | (finalMaxCurrent[1] >= 12) :
            if (finalMaxCurrent[0] >= 16) | (finalMaxCurrent[1] >= 16) :
                return 3
            else: return 2
        else: return 1
    
    def fetchMaxCurrent_A():
        cursor.execute("SELECT TOP 1 Data2, Data3 FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")
        initialMaxCurrent = str(cursor.fetchall())
        finalMaxCurrent = ['0'] * 2
        finalMaxCurrent = re.findall('\d*\.?\d+',initialMaxCurrent)
        for i in range(len(finalMaxCurrent)):
            finalMaxCurrent[i] = float(finalMaxCurrent[i])
        if (finalMaxCurrent[0] >= 12) | (finalMaxCurrent[1] >= 12) :
            if (finalMaxCurrent[0] >= 16) | (finalMaxCurrent[1] >= 16) :
                return 3
            else: return 2
        else: return 1

    def fetchSteadyCurrent():
        cursor.execute("SELECT TOP 1 Data11, Data12, Data13, Data14, Data15 FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;") 
        initialSteadyCurrent = str(cursor.fetchall())
        finalSteadyCurrent = ['0'] * 5
        finalSteadyCurrent = re.findall('\d*\.?\d+',initialSteadyCurrent)
        for i in range(len(finalSteadyCurrent)):
            finalSteadyCurrent[i] = float(finalSteadyCurrent[i])

        statusEach = [0] * 5    
        for i in range(len(finalSteadyCurrent)):    #rank status of every point
            if finalSteadyCurrent[i] >= 6:
                statusEach[i] = 3
            if finalSteadyCurrent[i] <3:
                statusEach[i] = 1
            if statusEach[i] == 0:
                statusEach[i] = 2
        
        finalStatus = statusEach[0]
        for i in range(len(statusEach)-1):    #choose max status
            if statusEach[i+1] > statusEach[i]:
                finalStatus = statusEach[i+1]

        return finalStatus

    def fetchSteadyCurrent_A():
        cursor.execute("SELECT TOP 1 Data11, Data12, Data13, Data14, Data15 FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")  
        initialSteadyCurrent = str(cursor.fetchall())
        finalSteadyCurrent = ['0'] * 5
        finalSteadyCurrent = re.findall('\d*\.?\d+',initialSteadyCurrent)
        for i in range(len(finalSteadyCurrent)):
            finalSteadyCurrent[i] = float(finalSteadyCurrent[i])

        statusEach = [0] * 5    
        for i in range(len(finalSteadyCurrent)):    #rank status of every point
            if finalSteadyCurrent[i] >= 6:
                statusEach[i] = 3
            if finalSteadyCurrent[i] <3:
                statusEach[i] = 1
            if statusEach[i] == 0:
                statusEach[i] = 2
        
        finalStatus = statusEach[0]
        for i in range(len(statusEach)-1):    #choose max status
            if statusEach[i+1] > statusEach[i]:
                finalStatus = statusEach[i+1]

        return finalStatus

    def fetchTime():    # Data27: t=7s, Data28: t=8s, Data31: t=10s
        cursor.execute("SELECT TOP 1 Data28, Data31 FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")  
        initialTime = str(cursor.fetchall())
        finalTime = ['0'] * 2
        finalTime = re.findall('\d*\.?\d+',initialTime)
        for i in range(len(finalTime)):
            finalTime[i] = float(finalTime[i])
        timeStatus = 1
        if finalTime[1] != 0:
           timeStatus = 3
        else: 
            if finalTime[0] != 0:
                timeStatus = 2
        return timeStatus

    def fetchTime_A():    # Data27: t=7s, Data28: t=8s, Data31: t=10s
        cursor.execute("SELECT TOP 1 Data28, Data31 FROM Records WHERE PMID LIKE '%A' ORDER BY (str(RDate) + str(RTime)) DESC;")  
        initialTime = str(cursor.fetchall())
        finalTime = ['0'] * 2
        finalTime = re.findall('\d*\.?\d+',initialTime)
        for i in range(len(finalTime)):
            finalTime[i] = float(finalTime[i])
        timeStatus = 1
        if finalTime[1] != 0:
            timeStatus = 3
        else: 
            if finalTime[0] != 0:
                timeStatus = 2
        return timeStatus    

    opStatus = [0] * 6
    opStatus[0] = fetchMaxCurrent()
    opStatus[1] = fetchMaxCurrent_A()
    opStatus[2] = fetchSteadyCurrent()
    opStatus[3] = fetchSteadyCurrent_A()
    opStatus[4] = fetchTime()
    opStatus[5] = fetchTime_A()
    #opStatus = [Max(B), MaxA, Steady(B), SteadyA, Time(B), TimeA]
    
    return opStatus

print(diagnosticUnit())

#----------------------trendAnalysis-----------------------------------------------------------------------------------------------

@eel.expose
def returnAvgMaxA():
    query = """SELECT TOP 10 Data2, Data3 FROM Records WHERE PMID='{PMID}' ORDER BY (str(RDate) + str(RTime)) DESC;"""
    cursor.execute(query.format(
        PMID=eel.showValue()()
    ))
    initialMaxA = str(cursor.fetchall())
    finalMaxA = ['0'] * 20
    finalMaxA = re.findall('\d*\.?\d+',initialMaxA)
    for i in range(len(finalMaxA)):
        finalMaxA[i] = float(finalMaxA[i])
    averageMaxA = ['0'] * 10
    for i in range(len(finalMaxA)):
        if (i%2) == 1 :
            averageMaxA[int((i-1)/2)] = (finalMaxA[i] + finalMaxA[i-1] ) /2

    temp = ['0'] * 10       #Reverse array
    for i in range(len(averageMaxA)):
        temp[i] = averageMaxA[i]
    for i in range(len(averageMaxA)):
        averageMaxA[i] = temp[len(averageMaxA) - i - 1]

    return averageMaxA

@eel.expose
def returnSteadyA():
    query = """SELECT TOP 10 Data11, Data12, Data13, Data14, Data15 FROM Records WHERE PMID='{PMID}' ORDER BY (str(RDate) + str(RTime)) DESC;"""
    cursor.execute(query.format(
        PMID=eel.showValue()()
    ))
    initialSteadyA = str(cursor.fetchall())
    finalSteadyA = ['0'] * 150
    finalSteadyA = re.findall('\d*\.?\d+',initialSteadyA)
    for i in range(len(finalSteadyA)):
        finalSteadyA[i] = float(finalSteadyA[i])
    averageSteadyA = ['0'] * 10
    for i in range(len(finalSteadyA)):
        if (i%5) == 4 :
            averageSteadyA[int(i/5)] = round(((finalSteadyA[i] + finalSteadyA[i-1] + finalSteadyA[i-2] + finalSteadyA[i-3] + finalSteadyA[i-4]) /5), 3)

    temp = ['0'] * 10   #Reverse array
    for i in range(len(averageSteadyA)):
        temp[i] = averageSteadyA[i]
    for i in range(len(averageSteadyA)):
        averageSteadyA[i] = temp[len(averageSteadyA) - i - 1]

    return averageSteadyA

@eel.expose
def returnTime():
    query = """SELECT TOP 10 RDate, RTime FROM Records WHERE PMID='{PMID}' ORDER BY (str(RDate) + str(RTime)) DESC;"""
    cursor.execute(query.format(
    PMID=eel.showValue()()
    ))
    initialTime = str(cursor.fetchall())
    finalTime = ['0'] * 20
    finalTime = re.findall('\d*\.?\d+',initialTime)
    opDate = ['0'] * 10
    opTime = ['0'] * 10
    for i in range(len(finalTime)):
        finalTime[i] = float(finalTime[i])
        if (i%2) == 1:
            opTime[int(i/2)]= finalTime[i]
        else:
            opDate[int((i/2)-1)]= finalTime[i]
        output = [opDate, opTime]   # output[0]=opDate, output[1]=opTime
    return output

@eel.expose
def returnDuration():
    query = """SELECT TOP 10 Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8, Data9, Data10, Data11, Data12, Data13, Data14, Data15, Data16, Data17, Data18, Data19, Data20, Data21, Data22, Data23, Data24, Data25, Data26, Data27, Data28, Data29, Data30, Data31, Data32, Data33, Data34 FROM Records WHERE PMID='{PMID}' ORDER BY (str(RDate) + str(RTime)) DESC;"""
    cursor.execute(query.format(
        PMID=eel.showValue()()
    ))
    initialDuration = str(cursor.fetchall())
    finalDuration = ['0'] * 340
    finalDuration = re.findall('\d*\.?\d+',initialDuration)
    for i in range(len(finalDuration)):
        finalDuration[i] = float(finalDuration[i])
    opDuration = ['0'] * 10
    n = 0
    i = 0
    while i < 339:
        i += 1
        if finalDuration[i] == 0:
            opDuration[n] = (i%34 + 1)
            n += 1
            i = (int(i/34)) * 34 + 34

    temp = ['0'] * 10       #Reverse array
    for i in range(len(opDuration)):
        temp[i] = opDuration[i]
    for i in range(len(opDuration)):
        opDuration[i] = temp[len(opDuration) - i - 1]

    return opDuration

        


eel.init('web')
eel.start('templates/main.html', jinja_templates='templates',   #https://stackoverflow.com/questions/66410660/how-to-use-jinja2-template-in-eel-python
    size = (600,400))

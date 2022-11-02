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
      
    #eel.js_bigger(f'{count}rem')    js function to py template
    
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

eel.init('web')
eel.start('templates/main.html', jinja_templates='templates',   #https://stackoverflow.com/questions/66410660/how-to-use-jinja2-template-in-eel-python
    size = (600,400))

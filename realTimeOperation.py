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
    storedResult = [0] * 34
    cursor.execute("SELECT TOP 1 Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8, Data9, Data10,Data11, Data12, Data13, Data14, Data15, Data16, Data17, Data18, Data19, Data20, Data21, Data22, Data23, Data24,Data25, Data26, Data27, Data28, Data29, Data30, Data31, Data32, Data33, Data34 FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialResult = str(cursor.fetchall())
    finalResult = ['0'] * 34
    finalResult = re.findall('\d*\.?\d+',initialResult)
    for i in range(len(finalResult)):
        finalResult[i] = float(finalResult[i])
    if storedResult!=finalResult:
        storedResult = finalResult
        return storedResult


@eel.expose
def RTime():
    storedRTime = [0] 
    cursor.execute("SELECT TOP 1 RTime FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRTime = str(cursor.fetchall())
    finalRTime = [0]
    finalRTime = re.findall(r'\d+',initialRTime)
    if storedRTime[0] != finalRTime[0]:
        storedRTime[0] = finalRTime[0]
        return str(storedRTime[0])



@eel.expose
def RDate():

    storedRDate = [0] 
    cursor.execute("SELECT TOP 1 RDate FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialRDate = str(cursor.fetchall())
    finalRDate = [0]
    finalRDate = re.findall(r'\d+',initialRDate)
    if storedRDate[0] != finalRDate[0]:
        storedRDate[0] = finalRDate[0]
        return str(storedRDate[0])


@eel.expose
def PMID():
    storedPMID = [0] 
    cursor.execute("SELECT TOP 1 PMID FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialPMID = str(cursor.fetchall())
    finalPMID = [0]
    finalPMID = re.findall("[a-zA-Z0-9]+",initialPMID)
    if storedPMID[0] != finalPMID[0]:
        storedPMID[0] = finalPMID[0]
        if (("A" in storedPMID[0]) | ("B" in storedPMID[0])):
            print ("contain")    #To BE ACTION
        return str(storedPMID[0])




eel.init('web')
eel.start('templates/main.html', jinja_templates='templates',   #https://stackoverflow.com/questions/66410660/how-to-use-jinja2-template-in-eel-python
    size = (600,400))

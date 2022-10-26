from typing import final
import pyodbc   #database usage
import re   #extract decimals from list
import time
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


storedPMID = [0] 
while True:
    cursor.execute("SELECT TOP 1 PMID FROM Records ORDER BY (str(RDate) + str(RTime)) DESC;")
    initialPMID = str(cursor.fetchall())
    finalPMID = [0]
    finalPMID = re.findall("[a-zA-Z0-9]+",initialPMID)
    if storedPMID[0] != finalPMID[0]:
        storedPMID[0] = finalPMID[0]
        if (("A" in storedPMID[0]) | ("B" in storedPMID[0])):
            print ("contain")
        print (str(storedPMID[0]))
    time.sleep(2)

         
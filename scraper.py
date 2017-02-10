import os
import stat
import xml.dom.minidom as xml
import pprint
import json

def getAllXMLFileNames(dirName):
    return [i for i in os.listdir(dirName) if i.endswith('pipeline')]

def parseXML(file):
    currentDom = xml.parse(file)

    #REGISTER - seperating into loads because this will all be in one register tag
    register = []
    for reg in currentDom.getElementsByTagName('register'):
        for load in reg.getElementsByTagName('load'):
            # print load.getAttribute("name")
            register.append(load.toprettyxml())

    #SENSOR
    sensor = []
    for sens in currentDom.getElementsByTagName('sensor'):
        sensor.append(sens.toprettyxml())

    #TODO @avaid96: Figure out what happens with consumer and decoration
    
    return register, sensor

def parseAll(directory):
    files = getAllXMLFileNames(os.getcwd())
    map = {} 
    for file in files:
        register, sensor = parseXML(file)
        fileName = file[:-9]
        if fileName.endswith("_read"):
            fileName = fileName[:-5]
        if fileName.endswith("_write"):
            fileName = fileName[:-6]
        map[fileName] = [register, sensor]
    return map

def main():
    dir = os.getcwd()
    map = parseAll(dir)
    with open('map.json', 'w') as jsonFile:
        mapDump = json.dumps(map, indent=4, ensure_ascii=False)
        jsonFile.write(mapDump)
    
if __name__=="__main__":
    main()

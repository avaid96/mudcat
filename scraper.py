import os
import xml.dom.minidom as xml
import pprint

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
    # print register

    #SENSOR
    sensor = []
    for sens in currentDom.getElementsByTagName('sensor'):
        sensor.append(sens.toprettyxml())
    # print sensor

    #TODO @avaid96: Figure out what happens with consumer and decoration
    
    return register, sensor

def parseAll(directory):
    files = getAllXMLFileNames(os.getcwd())
    map = {} 
    for file in files:
        register, sensor = parseXML(file)
        map[file] = [register, sensor]
    return map

def main():
    dir = os.getcwd()
    map = parseAll(dir)
    pprint.pprint(map.keys())
    
if __name__=="__main__":
    main()

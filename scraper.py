import os
import stat
import xml.dom.minidom as xml
import pprint
import json

def getAllXMLFileNames(dirName):
    pipelines = []
    for path, subdirs, files in os.walk(dirName):
        for name in files:
            fPathName = os.path.join(path, name) 
            if fPathName.endswith('pipeline'):
                pipelines.append(fPathName)
    return pipelines

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

    #VISUALIZATION - just the first consumer after the visualization comment
    visualization = []
    nodes = currentDom.documentElement.childNodes
    visCommentIdx = -1
    for i,n in enumerate(nodes):
        if n.nodeType==n.COMMENT_NODE:
            if 'visualization' in str(n.data):
                visCommentIdx=i
    if visCommentIdx!=-1:
        for i,n in enumerate(nodes[visCommentIdx:]):
            xmlnode = nodes[visCommentIdx+i].toprettyxml()
            if 'consumer' in str(xmlnode):
                visualization.append(xmlnode)
                break
    else:
        print "error handling not done if no visualization"

    #TODO @avaid96: Figure out what happens with and decoration
    return register, sensor, visualization

def parseAll(directory):
    files = getAllXMLFileNames(os.getcwd())
    map = {} 
    for file in files:
        register, sensor, visualization = parseXML(file)
        fileName = file[:-9]
        fileName = os.path.basename(fileName)
        if fileName.endswith("_read"):
            fileName = fileName[:-5]
        if fileName.endswith("_write"):
            fileName = fileName[:-6]
        map[fileName] = [register, sensor, visualization]
    return map

def main():
    dir = os.getcwd()
    map = parseAll(dir)
    with open('map.json', 'w') as jsonFile:
        mapDump = json.dumps(map, indent=4, ensure_ascii=False)
        jsonFile.write(mapDump)
    
if __name__=="__main__":
    main()

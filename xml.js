function getComponents() {
    // Get components chosen
    var components = []; //COMPONENTS IS AN ARRAY
    // TODO: Go through objects selected and populate components array
    // USING SAMPLE FOR NOW
    // ---------------
    // CREATING SAMPLE
    var sampleName = "camera";
    var sampleKeys = {};
    sampleKeys["option1"] = 2.0
    var sampleComponent = [sampleName, sampleKeys];
    var sampleName = "audio";
    var sampleComponent2 = [sampleName, sampleKeys];
    // ---------------
    // Adding component with settings to components array
    components.push(sampleComponent);
    components.push(sampleComponent2);

    // returning the filename and the formed component list where each component is [cName, cKeys]
    return components
}

function sampleMakeXML() {
    // CREATING XML
    // Start creating XML
    var doc = document.implementation.createDocument(pipename, 'xml')
    // Create element
    var tag = document.createElementNS('tagId', 'tag');
    // Set parameters in tag
    tag.setAttribute('opt1', 'abc');
    tag.setAttribute('opt2', 'def');
    doc.documentElement.appendChild(tag);

    // Create element 2
    var tag2 = document.createElementNS('tagId', 'tag2');
    // Set parameters in tag
    tag2.setAttribute('opt1', 'abc');
    tag2.setAttribute('opt2', 'def');
    doc.documentElement.appendChild(tag2);

    // Create a child of an element
    var tagChild = document.createElementNS('tagChildId', 'tagChild');
    // Set parameters in tag
    tagChild.setAttribute('opt1', 1.0);
    tagChild.setAttribute('opt2', 2.0);
    tag.appendChild(tagChild);

    console.log(doc);
}

function createXMLElem(tagName, options, nestable=true) {
    // Create element
    var tag;
    if(nestable) {
        tag = document.createElementNS('tagId', tagName);
        
        // Set parameters in tag
        Object.keys(options).forEach(function(key) {
            tag.setAttribute(key, options[key]);
        })
    }
    else {
        // TODO: Implement elements of type <load name="ssigraphic" />
        tag = document.createElement(tagName);
    }
    return tag
}

// A function that generates XML from various inputs got from the UI
function makePipe() {
    // Get map
    map = getJsonMap();
    // Get filename
    var fName = document.getElementById("pipename").value; 
    var components = getComponents();
    // console.log(fName);
    // Printing components list
    // var arrayLength = components.length;
    // for (var i = 0; i < arrayLength; i++) {
    //     console.log(i+" -> "+components[i]);
    // }

    // Start creating XML
    var pipe = document.implementation.createDocument('', 'pipeline');

    // Register block
    // TODO: FLAGS
    var comment = document.createComment("BEGIN REGISTER BLOCK");
    pipe.documentElement.appendChild(comment);
    var register = createXMLElem("register", {});
    pipe.documentElement.appendChild(register);
    // Loop through components and register them
    arrayLength = components.length;
    for (var i = 0; i < arrayLength; i++) {
        var currentCompName = (components[i][0]);
        var currentCompProps = (map[currentCompName]);
        var currentCompLoads = currentCompProps[0];
        // initialize loads
        arrayLen = currentCompLoads.length;
        var comment = document.createComment(currentCompName);
        register.appendChild(comment);
        for (var j = 0; j < arrayLen; j++) {
            currLoadStr = (currentCompLoads[j]);
            // ------- PARSE STRING TO DOM ELEMENT- "standard" method
            var d = document.createElement('div');
            d.innerHTML = currLoadStr;
            currLoad = (d.firstChild);
            // --------
            register.appendChild(currLoad);
        }
    }

    var comment = document.createComment("BEGIN SENSOR BLOCK");
    pipe.documentElement.appendChild(comment);
    // Sensor creation/initialization block
    // TODO: FLAGS
    arrayLength = components.length;
    for (var i = 0; i < arrayLength; i++) {
        var currentCompName = (components[i][0]);
        var currentCompProps = (map[currentCompName]);
        var currentCompSense = currentCompProps[1];
        document.createElement('div');
        d.innerHTML = currentCompSense;
        currSense = d.firstChild
        pipe.documentElement.appendChild(currSense);
    }

    var comment = document.createComment("BEGIN VISUALIZATION BLOCK");
    pipe.documentElement.appendChild(comment);
    // Visualization block
    var visualize = createXMLElem("consumer", {"create": "VideoPainter:plot", "title": "camera"});
    pipe.documentElement.appendChild(visualize);

    // Decorator block
    var visualize = createXMLElem("object", {"create": "Decorator", "icon": "true", "title": "Pipeline"});
    pipe.documentElement.appendChild(visualize);

    exportPipe('export.pipeline', 'text/xml', pipe);
}

function exportPipe(filename, mimeType, pipe) {
    // A 'hacky' way to download XML
    pipeAsStr = (new XMLSerializer()).serializeToString(pipe);
    var elHtml = pipeAsStr;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function getJsonMap() {
    return JSON.parse(Get("https://raw.githubusercontent.com/avaid96/mudcat/master/map.json"));
}


function getComponents() {
    // Get components chosen
    var components = []; //COMPONENTS IS AN ARRAY
    // TODO: Go through objects selected and populate components array
    // USING SAMPLE FOR NOW
    // ---------------
    // CREATING SAMPLE
    var sampleName = "sampleName";
    var sampleKeys = {};
    sampleKeys["option1"] = 2.0
    var sampleComponent = [sampleName, sampleKeys];
    // ---------------
    // Adding component with settings to components array
    components.push(sampleComponent);
    components.push(sampleComponent);

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

function createXMLElem(tagName, options, nestable) {
    // TODO: Implement elements of type <load name="ssigraphic" />
    // Create element
    var tag = document.createElementNS('tagId', tagName);
    // Set parameters in tag
    Object.keys(options).forEach(function(key) {
        tag.setAttribute(key, options[key]);
    })
    return tag
}

// A function that generates XML from various inputs got from the UI
function makePipe() {
    // Get filename
    var fName = document.getElementById("pipename").value; 
    var components = getComponents();
    // console.log(fName);
    // Printing components list
    // arrayLength = components.length;
    // for (var i = 0; i < arrayLength; i++) {
    //     console.log(i+" -> "+components[i]);
    // }

    // Start creating XML
    var pipe = document.implementation.createDocument('', 'pipeline');

    // Register block
    var register = createXMLElem("register", {});
    pipe.documentElement.appendChild(register);
    // Loop through components and register them

    // Sensor creation/initialization block
    //Loop through components 
        var sensor = createXMLElem("sensor", {"create": "CameraReader", "path": "camera.avi"});
        pipe.documentElement.appendChild(sensor);

    // Visualization block
    var visualize = createXMLElem("consumer", {"create": "VideoPainter:plot", "title": "camera"});
    pipe.documentElement.appendChild(visualize);

    // Decorator block
    var visualize = createXMLElem("object", {"create": "Decorator", "icon": "true", "title": "Pipeline"});
    pipe.documentElement.appendChild(visualize);

    console.log(pipe)

}
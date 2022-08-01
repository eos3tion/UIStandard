function setCurrentLayerSelection() {

    var idChnl = charIDToTypeID("Chnl");

    var actionSelect = new ActionReference();
    actionSelect.putProperty(idChnl, charIDToTypeID("fsel"));

    var actionTransparent = new ActionReference();
    actionTransparent.putEnumerated(idChnl, idChnl, charIDToTypeID("Trsp"));

    var actionDesc = new ActionDescriptor();
    actionDesc.putReference(charIDToTypeID("null"), actionSelect);
    actionDesc.putReference(charIDToTypeID("T   "), actionTransparent);

    executeAction(charIDToTypeID("setd"), actionDesc, DialogModes.NO);
}


function saveTxtToFile(filename, content) {
    var Path = app.activeDocument.path;
    var saveFile = File(Path + "/" + filename);
    if (saveFile.exists)
        saveFile.remove();
    saveFile.encoding = "UTF8";
    saveFile.open("e", "TEXT", "????");
    saveFile.writeln(content);
    saveFile.close();
}

function run(outfile) {
    var doc = app.activeDocument;
    var layers = doc.layers;
    var str = "";
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (filter(layer)) {
            var idx = RegExp.$1;
            doc.activeLayer = layer;
            setCurrentLayerSelection();
            var selec = doc.selection.bounds;
            str += idx + "\t" + selec[0].value + "\t" + selec[1].value + "\t" + selec[2].value + "\t" + selec[3].value + "\n";
        }
    }

    if (outfile) {
        saveTxtToFile(outfile, str);
    } else {
        $.writeln(str);
    }

    $.writeln("Done")
}


function filter(layer) {
    return /(.*?)\.jpg$/i.test(layer.name)
}

run("pos111.txt")
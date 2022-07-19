/**
 * 处理psd切图文本
 * 寻找激活的psd所在目录同名的excel文件，如果有，则读取文件内容，替换psd中文本，并将psd保存
 * 需要配合psd设置切图规则
 * @author 3tion
 * 2015-11-24
 **/


#include "helper.js"

{
    var docs = app.documents;
    var errMsg = "";
    for (var i = 0; i < docs.length; i++) {
        errMsg += solve(docs[i]);
    }
    var msg = "处理完成"
    if (errMsg) {
        msg += "\n中间有错误：\n" + errMsg;
    }
    alert(msg);
}


function solve(doc) {
    //检查是否有同名文件在同目录
    var fileUrl = doc.fullName.path + "/" + doc.name.replace(".psd", ".xlsx");
    var excelFile = new File(fileUrl);
    if (excelFile.exists) {
        var dict = {};
        var lines = getExcelLines(excelFile);
        if (lines) {
            //从第二行开始读
            for (var i = 1, len = lines.length; i < len; i++) {
                var line = lines[i];
                if (line) {
                    var txtData = new TextData(line);
                    dict[txtData.position] = txtData;
                }
            }
            checkLayers(doc.layers, "", dict);
            doc.save();

        }
    } else {
        return "无法找到excel文件：" + fileUrl;
    }
}

//0位置    1原始内容    2字体  3字号      4替换内容    5替换字体  6替换字号
function TextData(arr) {
    this.position = arr[0];
    this.oContent = arr[1] || "";
    this.oFont = arr[2];
    this.oSize = arr[3];
    this.tContent = arr[4] || this.oContent;
    this.tFont = arr[5] || this.oFont;
    this.tSize = arr[6] || this.oSize;
}

function checkLayers(layers, path, dict) {
    for (var i = 0, len = layers.length; i < len; i++) {
        var layer = layers[i];
        var p = layer.name;
        if (path) {
            p = path + "/" + p;
        }
        if (layer.layers) {
            checkLayers(layer.layers, p, dict);
        } else {
            if (layer.kind == "LayerKind.TEXT") {
                if (p in dict) { //在字典中
                    var info = dict[p];
                    var textItem = layer.textItem;
                    textItem.contents = info.tContent;
                    textItem.font = info.tFont;
                    textItem.size.convert("px");
                    textItem.size.value = info.tSize;
                }
            }
        }
    }
}
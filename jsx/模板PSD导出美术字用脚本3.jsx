/**
*@author 3tion(eos_3tion@163.com)
*@description 该版本文件会遍历所有打开的PSD文档，检查文档中psd模板文件是否有同名的xlsx文件，按xlsx中两列数据（第一列为文本内容，第二列为导出png的文件名），进行导出的ExtendScript脚本
*其中Excel文件Sheet1内容如下表单所示：
文件名	文本1	文本2
jjc1	a	1
jjc2	b	2
jjc3	c	3
jjc4	d	4
jjc5	e	5
jjc6	f	6
jjc7	g	7
jjc8	h	8
jjc9	i	9
jjc10	j	10
jjc11	k	11
jjc12	l	12
jjc13	m	13
*@version 0.0.1
*/
#include "helper.js"

//psd处理以后，导出png的文件夹名称
name1 = prompt("输入要输出的文件夹名", "文字", " 文件夹名字")
var pngOutAssetsName = name1;
//导出png的配置，使用png24导出
var saveOption = new ExportOptionsSaveForWeb();
saveOption.format = SaveDocumentType.PNG;
saveOption.PNG8 = false;

var todoDocuments = [];

/**
 * 检查打开的文档，看看每个psd/psb文档有没有同名csv文件，并将符合规则的文档数据存储在todo中
 */
function checkDocument(todo) {
    //检查打开的psd文件   
    for (var len = documents.length, i = 0; i < len; i++) {
        parseFile(documents[i]);
    }
}


/**
 * 处理单个文件
 * @param {Docuement} doc
 */
function parseFile(doc) {
    var docFile = doc.fullName;
    var f = docFile.fullName;
    //检查是否有同名文件在同目录
    var filePaths = f.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
    var excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    if (excelFile.exists) {
        var lines = getExcelLines(excelFile);
        if (lines) {
            var len = lines.length;
            for (var i = 1; i < len; i++) { //从第二行开始读
                //找到文本层，进行替换
                var layers = doc.layers;
                var textItem = null;
                var line = lines[i];
                var fileName = line[0]; //要输出的文件名
                for (var j = 0, llen = layers.length; j < llen; j++) {
                    var layer = layers[j];
                    if (layer.layers) {
                        alert("替换文本用psd，不允许有子文件夹");
                        continue;
                    }
                    //不做多层级遍历，也不判定文本名称
                    if (layer.kind == "LayerKind.TEXT") {
                        textItem = layer.textItem;
                        var oldText = textItem.contents;
                        var name = layer.name;
                        if (/^txt\d+$/.test(name)) {
                            var idx = +name.substr(3);
                            textItem.contents = line[idx] || "";
                        }
                    }
                }
                var folder = new Folder(docFile.path + "/" + pngOutAssetsName);
                if (!folder.exists) {
                    folder.create();
                }
                //将文件导出
                var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + fileName + ".png");

                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
            }
        }
    }
}

/**
 * 处理符合规则的文件列表
 * @param {Array} todo
 */
function parseFiles(todo) {
    for (var len = todo.length, i = 0; i < len; i++) {
        var arr = todo[i];
        parseFile(arr);
    }
}

if (confirm("是否检查所有打开的PSD文档？\n是-检查所有\n否-检查当前PSD文档")) {
    checkDocument(todoDocuments);
} else {
    var doc = getActiveDoc();
    if (doc) {
        todoDocuments.push(doc);
    }
}

parseFiles(todoDocuments);

alert("处理完成!");
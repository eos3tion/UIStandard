/**
* 初始化选区
* @author 3tion
* 2015-11-23
**/

function Rect(left, top, right, bottom) {
    this.left=left;
    this.top=top;
    this.right=right;
    this.bottom=bottom;
}

//无页签的
var rect1=new Rect(10,10,10,10);
//有上横页签的
var rect2=new Rect(10,35,10,10);
//有左竖页签
var rect3=new Rect(100,10,10,10);
try{
    var doc=app.activeDocument;
}
catch(e){
    doc=null;
}
if(doc){
    var dat = prompt("填写间距：left,top,right,bottom","10,10,10,10","填写坐标");
    var rect=eval("new Rect("+dat+")");
    doc.width.convert("px");
    doc.height.convert("px");
    var width = doc.width.value;
    var height= doc.height.value;
    var right = width-rect.right;
    var bottom=height-rect.bottom;    
    var selRegion=[[rect.left,rect.top],[right,rect.top],[right,bottom],[rect.left,bottom],[rect.left,rect.top]];
    doc.selection.select(selRegion);
}
else{
    alert("请先打开一个pdf文档");
}

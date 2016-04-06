function Rect(left,top,right,bottom){
    this.left=left;
    this.top=top;
    this.right=right;
    this.bottom=bottom;
}


try{
    var doc=app.activeDocument;
}
catch(e){
    doc=null;
}
if(doc){
    
    //上横页签的
    var rect=new Rect(14,74,14,16);
    doc.width.convert("px");
    doc.height.convert("px");
    var width = doc.width.value;
    var height= doc.height.value;
    var right = width-rect.right;
    var bottom=height-rect.bottom;    
    var selRegion=[[rect.left,rect.top],[right,rect.top],[right,bottom],[rect.left,bottom],[rect.left,rect.top]];
    doc.selection.select(selRegion);
    alert("处理完成");
}
else{
    alert("请先打开一个psd文档");
}
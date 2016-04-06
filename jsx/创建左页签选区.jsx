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
   
    //左竖页签
    var rect=new Rect(15,48,15,15);
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
    alert("请先打开一个pdf文档");
}

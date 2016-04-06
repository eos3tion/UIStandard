
var doc;
try{
	doc=app.activeDocument
}catch(e){
	doc=null;
}
var Extension = "png";
if(doc){
	Extension = prompt("输入要输出图片的格式，\n如默认当前格式请点击确定。","png","当前图层名称： ");
	Extension = Extension.toLowerCase();
	if(Extension.charAt(0)!=".")
	{
		Extension="."+Extension;
	}
	checkLayers(doc.layers);	
     alert("处理完成");
}
else{
        alert("请先打开一个psd文档");
}

function checkLayers(layers,path){
    for(var i=0,len=layers.length;i < len;i++){
        var layer = layers[i];
		//主要用于调试
        var layername=layer.name;
		if(layername=="不导出")//不导出的直接忽略掉
		{
			continue;
		}
		var p=layername;
        if(path)
        {
            p=path + "/" + layername;
        }
        if(layer.layers){
            checkLayers(layer.layers,p);
        }
        else
		{
		   var cext= layername.substr(-4);
		   if(cext!=Extension)
		   {
			 layer.name =layername+Extension;
		   }
        }
    }
}
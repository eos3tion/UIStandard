## 项目介绍
本项目用于制定**君游**的UI标准  
存放UI制作使用的工具
游戏项目中，会有资源(res)，美术原图(原始psd)，导出用(切图psd)  
针对不同的语言，会有不同语言版本  
本项目用于制定这些标准

## 相应标准  
### 出图方式
UI出图，使用`PhotoShop CC`以上版本的`文件-生成-图像资源`功能进行出图  
详细介绍参看百度经验：https://jingyan.baidu.com/article/67508eb4e720ee9cca1ce42c.html  

### 图层命名规格  
1. UI上需要输出带文本的图片，必须以 `txt_` 开头  
2. 一些文字是作为图标使用的，如`EXP`已经在国际上比较流行了，使用`txt_no_`开头进行文本层命名  
3. 作为背景的图片，使用`bg_`开头，通常按 `70% jpg`进行输出，如果更低的质量不会影响效果，则使用更低质量的图片  
4. 输出统一画布大小的美术文字，先建立一个模板psd文件，然后使用脚本 [jsx/模板PSD导出美术字用脚本.jsx](https://github.com/eos3tion/UIStandard/blob/master/jsx/%E6%A8%A1%E6%9D%BFPSD%E5%AF%BC%E5%87%BA%E7%BE%8E%E6%9C%AF%E5%AD%97%E7%94%A8%E8%84%9A%E6%9C%AC.jsx)进行输出

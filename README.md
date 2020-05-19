# vue-page-produce

## 仿 dataV 的可视化编辑器的骨架模板
### 该项目使用核心编辑区域使用开源框架vue-draggable-resize,抽出其源码，并且进行部分修改。项目将编辑平台和组件库进行分离，得到更强大的扩展性和可维护性.欢迎提出修改意见

### demo 地址：http://118.25.102.206/vue-page-produce/


### 文件结构：

```
vue-page-proeuce
│    
│
└───components    组件库              
│
└───src
    |
    └───views
          |
          └───partComponent  编辑平台代码
          |
          └───partComponentPreview 编辑平台预览代码
...
```

## 组件库：
组件库接收参数：
| 参数              | 类型     | 是否必传        | 描述                                               |
| ----------------- | -------- | --------------- | -------------------------------------------------- |
| styleFields       | Object   | 否              | 传递的组件的style的类，所有属性为组件内可配置的值  |
| Fields            | Object   | 是              | 传递给组件的数据对象，拓展组件库时可自行配置组件对应的属性 |

## 打包：
```
npm run build               打包编辑平台代码

npm run lib                 打包组件库代码
```
组件库代码打包后，应将生成的js文件放入平台代码文件夹内，若需要将组件库单独上传cdn,可直接修改index,html文件内


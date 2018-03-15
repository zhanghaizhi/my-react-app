# my-react-app
使用creat-react-app和ant-design构建的react项目，加上nodejs制作的静态文件服务器，
## 效果图
![image](https://github.com/zhanghaizhi/my-react-app/blob/master/1.png)
## 1.创建一个creat-react-app项目，项目名为my-app
```
install -g creat-react-app
```
```
create-react-app my-app
```

## 2，进入到my-app目录下，启动项目
```
npm start
```

这样生成的项目里配置文件不可见，如果有需要，可以运行
```
npm run eject
```

在使用过程中，使用es5的方式创建组件一直出错，不知道是不是create-react-app项目不允许

这个项目是仿照别人写的京东的项目，使用了他提供的图片资源，和json数据
项目地址是
https://github.com/zf-huangxiao/react

## 3，使用node创建静态服务器
在my-app下新建一个server文件，里面index.js创建服务和返回请求；resources目录下存放静态资源

进入到server目录，运行
```
node index.js
```
## 安装antDesignui框架
```
npm install antd --save
```
在App.css里引入@import '~antd/dist/antd.css';样式
在需要的地方引入模块，例如
```
import Button from 'antd/lib/button';
```




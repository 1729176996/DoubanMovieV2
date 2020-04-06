# DoubanMovieV2
自己写的豆瓣电影项目2.0


创建vue项目的步骤

		1.安装node.js

		2.安装vue-cli 脚手架构建工具（必须在全局中进行安装）
		npm install -g vue-cli

		3..全局安装 vue-cli
		npm install --global vue-cli

		4.创建一个初始化的vue项目
		vue init webpack DoubanMovie
			Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写，所以我把名称改成了vueclitest
			Project description:项目描述，默认为A Vue.js project,直接回车，不用编写。
			Author：作者，如果你有配置git的作者，他会读取。
			Install  vue-router? 是否安装vue的路由插件，我们这里需要安装，所以选择Y
			Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格。我们这里不需要输入n（建议），如果你是大型团队开发，最好是进行配置。
			setup unit tests with  Karma + Mocha? 是否需要安装单元测试工具Karma+Mocha，我们这里不需要，所以输入n。
			Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试，我们这里不需要，所以输入n

安装额外插件
    npm install jquery
    npm install better-scroll --save
    npm install less less-loader css-loader style-loader file-loader font-awesome --save
在vue文件里里导入
    import $ from 'jquery'
    import BScroll from 'better-scroll'
在main.js里导入
    import 'font-awesome/css/font-awesome.min.css'
vue中font-awesome的使用方法参考[VUE.之安装 font-awesome](https://www.cnblogs.com/Charles-Yuan/p/11273347.html)

命令行跳转到项目文件夹里运行项目
	npm run dev

vue项目打包,命令行跳转到项目文件夹里打包项目，打包后的dist文件夹直接放到服务器
	npm run build


vue如何实现返回上一页不刷新，可以参考[vue单页应用前进刷新后退不刷新方案探讨](https://www.cnblogs.com/wonyun/p/8763314.html)

为了解决打包后dist文件夹的index.html空白页的问题，在config文件夹的index.js中修改，参考[关于vue-cli打包后，index显示空白页解决方法](https://blog.csdn.net/jasons_xie/article/details/80901589)

如果打包后的文件不能上传Github，把.gitignore文件中的 /dist/删掉，然后重新打包上传就可以了，参考[Vue项目dist文件夹不能上传至github问题](https://www.jianshu.com/p/7b841e9d0f13?utm_source=desktop&utm_medium=timeline)

如果打包后font-awesome图标不能正常显示，修改build/webpack.base.conf.js里的配置，把相关的limit设置更大些，可以参考[vue引入font awesome 及webpack打包后图标不显示的问题](https://www.jianshu.com/p/34007f9d23a7?utm_campaign=maleskine)

提交Github后可以根据[GitHub Pages](https://1729176996.github.io/DoubanMovieV2/dist/index.html)来查看效果

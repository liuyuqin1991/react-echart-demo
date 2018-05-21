/**
 * Created by liuyuqin on 2017/12/22.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	devtool: 'eval-source-map',
	entry:  __dirname + "/src/Index.js",//已多次提及的唯一入口文件
	output: {
		path: __dirname + "/build",//打包后的文件存放的地方
		filename: "bundle.js"//打包后输出文件的文件名
	},
	devServer: {
		contentBase: "./build",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true//实时刷新
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			},
			//对自己的css代码开启css模块化 对antd关闭css模块化，才能保证antd的CSS正确引入
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'
			},
			{
				test: /\.css$/,
				exclude: /(src)/,
				loader: 'style-loader!css-loader'
			},
			{
				test:/\.(png)|(jpg)$/,
				exclude: /(node_modules)/,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	plugins: [
		//添加了一个给打包后代码添加版权声明的插件
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new webpack.SourceMapDevToolPlugin(),
		//依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
		// new HtmlWebpackPlugin({
		// 	template: __dirname + "/src/html/index.tmpl.html"
		// }),
		//允许你在修改组件代码后，自动刷新实时预览修改后的效果
		new webpack.HotModuleReplacementPlugin(),
		// //去除build文件中的残余文件,添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件clean-webpack-plugin
		// new CleanWebpackPlugin('build/*.*', {
		// 	root: __dirname,
		// 	verbose: true,
		// 	dry: false
		// })
	],
};


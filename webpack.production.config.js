/**
 * Created by liuyuqin on 2017/12/22.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	devtool: 'none',
	entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
	output: {
		path: __dirname + "/public",//打包后的文件存放的地方
		//打包后输出文件的文件名，
		//webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
		filename: "bundle-[hash].js"
	},
	devServer: {
		contentBase: "./public",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			},{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					}, {
						loader: "css-loader",
						options: {
							modules: true, // 指定启用css modules
							localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
						}
					}
				]
			}
		]
	},
	plugins: [
		//添加了一个给打包后代码添加版权声明的插件
		new webpack.BannerPlugin('版权所有，翻版必究'),
		//依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
		new HtmlWebpackPlugin({
			template: __dirname + "/app/html/index.tmpl.html"
		}),
		//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
		new webpack.optimize.OccurrenceOrderPlugin(),
		//压缩JS代码；
		new webpack.optimize.UglifyJsPlugin(),
		//分离CSS和JS文件
		new ExtractTextPlugin("style.css"),
		//去除build文件中的残余文件,添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件clean-webpack-plugin
		new CleanWebpackPlugin('build/*.*', {
			root: __dirname,
			verbose: true,
			dry: false
		})
	],
};


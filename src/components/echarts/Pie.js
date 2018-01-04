/**
 * Created by liuyuqin on 2017/12/22.
 */

import React, {Component} from 'react'
import styles from '../../css/echarts.css';
import echarts from 'echarts';
import PubSub from 'pubsub-js';
import { CommonEchartsConfig } from './CommonEchartsConfig'


class Pie extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			myChart : null,
			option : null,
			pubsubToken : null,
		};
	}
	
	componentDidMount() {
		const PieData = [
			{value:235, name:'直接访问'},
			{value:720, name:'视频广告'},
			{value:1548, name:'搜索引擎'}
		];
		let option = CommonEchartsConfig.initDefaultPie('React与ECharts',['直接访问','视频广告','搜索引擎'],PieData,null,null);
		CommonEchartsConfig.setLegendPosition(option,"vertical","left","top");
		CommonEchartsConfig.setTitlePosition(option,"center");
		this.state.option = option;
		 // 基于准备好的dom，初始化echarts实例
		this.state.myChart = echarts.init(document.getElementById(this.props.componentsId));
		// 使用通用配置工厂进行echart配置
		this.state.myChart.setOption(option);
		//通过PubSub库订阅一个信息
		this.state.pubsubToken = PubSub.subscribe('echartConfig_' + this.props.componentsId, function (topic, echartConfig) {
			let option = this.state.option;
			//标题
			if(echartConfig.titleText){
				CommonEchartsConfig.setTitleText(option,echartConfig.titleText);
			}
			//是否显示
			if(echartConfig.titleIsShow){
				CommonEchartsConfig.setTitleIsShow(option,echartConfig.titleIsShow);
			}
			this.state.myChart.setOption(option);
			this.setState({
				option: option,
			});
		}.bind(this));
	}
	
	render() {
		return (
			<div id={this.props.componentsId} className={styles.root}>
			</div>
		);
	}
}

export default Pie

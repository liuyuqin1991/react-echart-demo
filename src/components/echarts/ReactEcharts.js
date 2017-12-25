/**
 * Created by liuyuqin on 2017/12/22.
 */

import React, {Component} from 'react'
import styles from '../../css/echarts.css';
import echarts from 'echarts';
import PubSub from 'pubsub-js';
import { CommonEchartsConfig } from './CommonEchartsConfig'


class ReactEcharts extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			myChart : null,
			option : null,
			pubsubToken : null,
		};
	}
	
	componentDidMount() {
		let option = CommonEchartsConfig.initDefaultLine('ECharts 入门示例',["销量"],[[5, 20, 36, 10, 10, 20]],null,["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]);
		this.state.option = option;
		 // 基于准备好的dom，初始化echarts实例
		this.state.myChart = echarts.init(document.getElementById('main'));
		// 使用通用配置工厂进行echart配置
		this.state.myChart.setOption(option);
		//通过PubSub库订阅一个信息
		this.state.pubsubToken = PubSub.subscribe('echartTitle', function (topic, echartTitleByText) {
			let option = this.state.option;
			CommonEchartsConfig.setTitleText(option,echartTitleByText);
			this.state.myChart.setOption(option);
			this.setState({
				option: option,
			});
		}.bind(this));
	}
	
	render() {
		return (
			<div id="main" className={styles.root}>
			
			</div>
		);
	}
}

export default ReactEcharts

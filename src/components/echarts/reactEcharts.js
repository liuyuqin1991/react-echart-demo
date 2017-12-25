/**
 * Created by liuyuqin on 2017/12/22.
 */

import React, {Component} from 'react'
import styles from '../../css/echarts.css';
import echarts from 'echarts';
import { EchartRender } from './config'
class ReactEcharts extends Component{
	
	
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById('main'));
		// 使用通用配置工厂进行echart配置
		let option = EchartRender.initDefaultLine('ECharts 入门示例',["销量"],[[5, 20, 36, 10, 10, 20]],null,["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]);
		myChart.setOption(option);
	}
	
	render() {
		return (
			<div id="main" className={styles.root}>
			
			</div>
		);
	}
}

export default ReactEcharts

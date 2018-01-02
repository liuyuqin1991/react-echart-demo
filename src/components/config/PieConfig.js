/**
 * Created by liuyuqin on 2017/12/25.
 */
import React, {Component} from 'react'
import PubSub from 'pubsub-js';
import { Form,Radio,Input,Icon } from 'antd';
import 'antd/dist/antd.css';
import Styles from './Config.css'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const echartConfig = {};

class LineConfig extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			echartTitle:"",
			echartTitleIsShow:"1",
		}
	}
	
	titleInputChange(e){
		this.setState({
			echartTitle: e.target.value,
		});
		echartConfig.titleText = e.target.value;
		//通过PubSub库发布信息
		PubSub.publish('echartConfig_' + this.props.componentsId, echartConfig);
	}
	
	titleIsShowChange(e){
		this.setState({
			echartTitleIsShow: e.target.value,
		});
		echartConfig.titleIsShow = e.target.value;
		//通过PubSub库发布信息
		PubSub.publish('echartConfig_' + this.props.componentsId, echartConfig);
	}
	
	render() {
		return(
			<div className={Styles.p10}>
				<FormItem label="标题:">
					<Input prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="React与ECharts" onChange={this.titleInputChange.bind(this)} value={this.state.echartTitle}/>
				</FormItem>
				<FormItem label="是否显示:">
					<RadioGroup onChange={this.titleIsShowChange.bind(this)} value={this.state.echartTitleIsShow}>
						<Radio value="1">显示</Radio>
						<Radio value="0">不显示</Radio>
					</RadioGroup>
				</FormItem>
			</div>
		);
	}
}


export default Form.create()(LineConfig);
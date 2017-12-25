/**
 * Created by liuyuqin on 2017/12/25.
 */
import React, {Component} from 'react'
import PubSub from 'pubsub-js';

class EditEchartsConfig extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			echartTitle:"",
		}
	}
	
	titleInputChange(e){
		this.setState({
			echartTitle: e.target.value,
		});
		//通过PubSub库发布信息
		PubSub.publish('echartTitle', e.target.value);
	}
	
	render() {
		return(
			<div>
				<label>标题：</label><input placeholder="ECharts 入门示例" onChange={this.titleInputChange.bind(this)} value={this.state.echartTitle}/>
			</div>
		);
	}
}


export default EditEchartsConfig
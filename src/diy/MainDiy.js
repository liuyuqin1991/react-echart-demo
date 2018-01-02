import React, {Component} from 'react'
import { Form,Button,Icon } from 'antd';
import 'antd/dist/antd.css';
import Styles from './MainDiy.css'
import Line from '../components/echarts/Line'
import Pie from '../components/echarts/Pie'

const FormItem = Form.Item;

const LINE = "line";
const PIE = "pie";

class MainDiy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			echarts:[],
		}
	}
	
	addEcharts(type){
		let echarts = this.state.echarts;
		if(type === LINE){
			echarts.push({
				type:LINE
			});
		}
		else if(type === PIE){
			echarts.push({
				type:PIE
			});
		}
		this.setState({
			echarts : echarts
		});
	}
	
	render() {
		const formItemLayoutWithOutLabel = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 20, offset: 4 },
			},
		};
		const formItems = this.state.echarts.map((k, index) => {
			const componentsId = "echart_" + index;
			if(k.type === LINE){
				return (
					<FormItem key={index}>
						<Line componentsId={componentsId}/>
					</FormItem>
				);
			}
			else if(k.type === PIE){
				return (
					<FormItem key={index}>
						<Pie componentsId={componentsId}/>
					</FormItem>
				);
			}
		});
		return(
			<div className={Styles.p10}>
				<Form>
					{formItems}
					<FormItem {...formItemLayoutWithOutLabel}>
						<Button type="dashed" onClick={this.addEcharts.bind(this,LINE)} style={{ width: '60%' }}>
							<Icon type="plus" /> Add line field
						</Button>
						<Button type="dashed" onClick={this.addEcharts.bind(this,PIE)} style={{ width: '60%' }}>
							<Icon type="plus" /> Add pie field
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}


export default Form.create()(MainDiy);
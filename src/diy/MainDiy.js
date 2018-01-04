import React, {Component} from 'react';
import { Layout,Form,Menu,Input,Icon,Button,Row,Col } from 'antd';
import 'antd/dist/antd.css';
import Constant from '../constant/Constant';
import Draggable from 'react-draggable';
import Styles from './MainDiy.css';
import Line from '../components/echarts/Line';
import Pie from '../components/echarts/Pie';

const { SubMenu } = Menu;
const { Header} = Layout;

class MainDiy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			echarts:[],
			currentDragType:null,
		};
	}
	
	/**
	 * 设置正在拖动的组件type
	 * @param type 图表类型
	 */
	setCurrentDragType(type){
		this.setState({
			currentDragType:type
		});
	}
	
	/**
	 * 新增一个图表组件
	 * @param type 图表类型
	 */
	addEchart(type){
		let echarts = this.state.echarts;
		if(type === Constant.LINE){
			echarts.push({
				type:Constant.LINE
			});
		}
		else if(type === Constant.PIE){
			echarts.push({
				type:Constant.PIE
			});
		}
		this.setState({
			echarts : echarts
		});
	}
	
	render() {
		const formItems = this.state.echarts.map((k, index) => {
			const componentsId = "echart_" + index;
			if(k.type === Constant.LINE){
				return (
					<Draggable bounds="parent" key={index}>
						<div className={Styles.initEchart}>
							<Line componentsId={componentsId}/>
						</div>
					</Draggable>
				);
			}
			else if(k.type === Constant.PIE){
				return (
					<Draggable bounds="parent" key={index}>
						<div className={Styles.initEchart}>
							<Pie componentsId={componentsId}/>
						</div>
					</Draggable>
				);
			}
		});
		return(
			<Layout>
				<Header className="header">
					<div className="logo" />
				</Header>
				<Layout>
					<Row>
						<Col span={3}>
							<Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
								<SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
									<Menu.Item key="1">
										<Button name="折线图" type={Constant.LINE}>折线图</Button>
									</Menu.Item>
									<Menu.Item key="2">
										<Button name="饼图" type={Constant.PIE}>饼图</Button>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Col>
						<Col span={20}>
							<div className={Styles.dragZoom}>
								{formItems}
							</div>
							<Button type="dashed" onClick={this.addEchart.bind(this,Constant.LINE)} style={{ width: '60%' }}>
								<Icon type="plus" /> Add line field
							</Button>
							<Button type="dashed" onClick={this.addEchart.bind(this,Constant.PIE)} style={{ width: '60%' }}>
								<Icon type="plus" /> Add bar field
							</Button>
						</Col>
					</Row>
				</Layout>
			</Layout>
		);
	}
}


export default MainDiy;
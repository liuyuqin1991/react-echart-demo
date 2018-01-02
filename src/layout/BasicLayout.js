/**
 * Created by liuyuqin on 2017/12/25.
 */
import React from 'react';
import ReactEcharts from '../components/echarts/ReactEcharts';
import EditEchartsConfig from "../components/config/LineConfig";

class BasicLayout extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div>
				<div>
					<ReactEcharts />
				</div>
				<div>
					<EditEchartsConfig />
				</div>
			</div>
		);
	}
}

export default BasicLayout;
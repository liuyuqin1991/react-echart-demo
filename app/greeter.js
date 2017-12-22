/**
 * Created by liuyuqin on 2017/12/22.
 */

import React, {Component} from 'react'
import config from './json/config.json';

class Greeter extends Component{
	render() {
		return (
			<div>
				{config.greetText}
			</div>
		);
	}
}

export default Greeter

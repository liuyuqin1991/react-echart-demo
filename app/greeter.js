/**
 * Created by liuyuqin on 2017/12/22.
 */

import React, {Component} from 'react'
import config from './json/config.json';

import styles from './css/greeter.css';

class Greeter extends Component{
	render() {
		return (
			<div className={styles.root}>
				{config.greetText}
			</div>
		);
	}
}

export default Greeter

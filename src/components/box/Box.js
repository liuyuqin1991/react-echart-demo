/**
 * Created by liuyuqin on 2018/1/2.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
};

const boxSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},
	
	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			alert(`You dropped ${item.name} into ${dropResult.name}!`);
		}
	},
};

const propTypes = {
	name: PropTypes.string.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

class Box extends Component {
	
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	};
	
	render() {
		const { isDragging, connectDragSource } = this.props;
		const { name } = this.props;
		const opacity = isDragging ? 0.4 : 1;
		return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
	}
}

Box.propTypes = propTypes;


export default DragSource(ItemTypes.BOX, boxSource, collect)(Box);
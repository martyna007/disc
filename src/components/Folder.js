import React, { Component } from 'react';

class Folder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			children: props.links.children.href,
			self: props.links.self.href,
			delete: props.links.delete.href
		};
	}

	render() {
		return (
			<div className="folder-container">
				<i className="material-icons">folder</i>
				<p>{this.props.name}</p>
			</div>
		);
	}
}

export default Folder;

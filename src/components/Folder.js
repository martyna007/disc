import React, { Component } from 'react';
import ContextMenu from "../views/Home";

class Folder extends Component {
	

	render() {
		return (
			<div>
				<ContextMenu/>
				<div className="folder-container" onContextMenu={this.handleClick}>
					<img src={require('../images/folder.png')} alt="folder"/>
					<p>{this.props.name}</p>
				</div>
			</div>

		);
	}
}

export default Folder;

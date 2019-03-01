import React, { Component } from 'react';

class ContextMenu extends Component {
	render() {
		return (
			<menu id="ctxMenu">
				<menu title="File">
					<menu title="Save"/>
					<menu title="Save As"/>
					<menu title="Open"/>
				</menu>
				<menu title="Edit">
					<menu title="Cut"/>
					<menu title="Copy"/>
					<menu title="Paste"/>
				</menu>
			</menu>
		);
	}
}

export default ContextMenu;

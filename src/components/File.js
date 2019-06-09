import React, { Component } from 'react';

class File extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			self: props.links.self.href,
			delete: props.links.delete.href
		};
	}
	changeCheckbox = e => {
		let eventNodes = document.getElementsByClassName('folder-checkbox');
		Object.keys(eventNodes).forEach(function (key) {
			if (eventNodes[key].id === e.target.id) {
				if (e.target.checked) {
					e.target.checked = true;
				} else {
					e.target.checked = false;
				}
			} else {
				eventNodes[key].checked = false;
			}
		});
	};
	contextMenu(id, e) {
		if (e.type === 'contextmenu') {
			e.preventDefault();
			let eventNodes = document.getElementsByClassName('folder-checkbox');
			Object.keys(eventNodes).forEach(function (key) {
				if (eventNodes[key].id === id) {
					document.getElementById(id).checked = true;
				} else {
					eventNodes[key].checked = false;
				}
			});
		}
	};
	renderIcon() {
		if (this.props.file.file.type.indexOf('image') !== -1) {
			return <i className="file-icon far fa-file-image"/>
		} else if (this.props.file.file.type === 'application/pdf') {
			return <i className="file-icon far fa-file-pdf"/>
		} else if (this.props.file.file.type === 'text/plain') {
			return <i className="file-icon far fa-file-alt"/>
		} else {
			return <i className="file-icon far fa-file"/>
		}
	}

	render() {
		return (
			<div className="folder-container" onContextMenuCapture={this.contextMenu.bind(this, this.props.id)}>
				<input className="folder-checkbox" type="checkbox" value={this.props.id} id={this.props.id} onChange={this.changeCheckbox}/>
				<label className="folder-checkbox-label" htmlFor={this.props.id}>
					{this.renderIcon()}
					<p>{this.props.name}</p>
				</label>

			</div>
		);
	}
}

export default File;

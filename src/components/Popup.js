import React, { Component } from 'react';
import axios from "axios";
const api = 'http://mydisc.xyz/api/folders/';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		if (this.props.type === 'rename') {
			this.setState({
				nameValue: this.props.selectedItem.folder.name
			})
		}
	}
	handleChange(event) {
		this.setState({
			nameValue: event.target.value
		});
	}

	sendPopupAction(action){
		this.props.popupAction(action);
	}

	renderPopup = () => {
		if (this.props.type) {
			switch (this.props.type) {
				case 'delete': {
					return <div className="warning-popup">
						<h4>Are you sure?</h4>
						<p>Do you really want to delete this item? There is no turning back</p>
						<div className="two-btn-container">
							<p className="button"  onClick={() => this.action('delete')}>Delete</p>
							<p className="button" onClick={() => this.action('cancel')}>Cancel</p>
						</div>
					</div>
				}
				case 'create': {
					return <div className="warning-popup">
						<h4>New folder</h4>
						<p>Enter name below</p>
						<input type="text" value={this.state.nameValue} onChange={this.handleChange} autoFocus={true}/>
						<br/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.action('create')}>Create</p>
							<p className="button" onClick={() => this.action('cancel')}>Cancel</p>
						</div>
					</div>
				}
				case 'rename': {
					return <div className="warning-popup">
						<h4>New folder name</h4>
						<p>Enter new name below</p>
						<input type="text" value={this.state.nameValue} onChange={this.handleChange} autoFocus={true}/>
						<br/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.action('rename')}>Change</p>
							<p className="button" onClick={() => this.action('cancel')}>Cancel</p>
						</div>
					</div>
				}
				case 'success': {
					return <div className="warning-popup">
						<h4>Success</h4>
						<p>Action completed successfully</p>
						<p className="button" onClick={() => this.action('cancel')}>OK</p>
					</div>
				}
				case 'error': {
					return <div className="warning-popup">
						<h4>Error</h4>
						<p>An error occured, try again</p>
						<p className="button" onClick={() => this.action('cancel')}>OK</p>
					</div>
				}
				default: {

				}
			}
		}
	};
	action(action) {
		switch (action) {
			case 'delete': {
				let item = this.props.selectedItem;
				axios.delete(item._links.delete.href).then((r) => {
					this.sendPopupAction('success')

				}).catch((e) => {
					this.sendPopupAction('error')
				}).then(() => {

				});
				break;
			}
			case 'create': {
				axios.post(api, {name: this.state.nameValue, parentId: this.props.parent.folder.id === 'root' ? null : this.props.parent.folder.id}).then((r) => {
					this.sendPopupAction('success')

				}).catch((e) => {
					this.sendPopupAction('error')

				}).then(() => {

				});
				break;
			}
			case 'rename': {
				let item = this.props.selectedItem;
				axios.patch(item._links.self.href, {name: this.state.nameValue}).then((r) => {
					this.sendPopupAction('success')

				}).catch((e) => {
					this.sendPopupAction('error')
				}).then(() => {

				});
				break;
			}
			case 'cancel': {
				this.sendPopupAction('cancel');
				break;
			}
			default: {
			}
		}
	};
	render() {
		return <div>
			{this.renderPopup()}
		</div>
	}

}

export default Popup;
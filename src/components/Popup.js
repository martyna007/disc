import React, { Component } from 'react';
import axios from "axios";

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			nameValue: event.target.value
		});
	}

	sendPopupAction(action){
		this.props.popupAction(action);
	}
	action(action) {
		switch (action) {
			case 'delete': {
				let item = this.props.currentItem;
				axios.delete(item._links.delete.href).then((r) => {
					this.setState({
						popup: true,
						popupType: 'success'
					});
					this.sendPopupAction('success')

				}).catch((e) => {
					this.setState({
						popup: true,
						popupType: 'error'
					});
					this.sendPopupAction('error')
				}).then(() => {

				});
				break;
			}
			case 'create': {
				axios.post('http://mydisc.xyz/api/folders', {name: this.state.nameValue, parentId: this.props.currentId}).then((r) => {
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
						<input type="text" value={this.state.nameValue} onChange={this.handleChange}/>
						<br/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.action('create')}>Create</p>
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

	render() {
		return <div>
			{this.renderPopup()}
		</div>
	}

}

export default Popup;
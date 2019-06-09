import React, { Component } from 'react';
import axios from "axios";
const api = 'http://mydisc.xyz/api/folders/';
let apiFile = '';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: '',
			binary: {},
			preview: '',
			file: null
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		if (this.props.type === 'rename') {
			this.setState({
				nameValue: this.props.selectedItem.folder.name
			})
		}
		if (this.props.type === 'upload' && this.props.parent.folder.id === 'root') {
			apiFile = 'http://mydisc.xyz/api/folders/root/files'
		} else if (this.props.type === 'upload') {
			apiFile = 'http://mydisc.xyz/api/folders/' + this.props.parent.folder.id + '/files'
		}
		if (this.props.type === 'show') {
			axios.get(this.props.selectedItem._links.download.href).then((r) => {
				console.log(r.data);

				this.setState({
					preview: r.data
				});

				console.log(this.state.preview);
			}).catch((e) => {

			}).then(() => {
				this.setState({
					loaded: true
				});
			});
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
	changeFile = event => {
		let formData = new FormData();

		let file = event.target.files[0];

		formData.append('file', file);

		this.setState({
			binary: formData,
			file:  URL.createObjectURL(file)
		});
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
						<input type="text" value={this.state.nameValue} onChange={this.handleChange} autoFocus={true}/>
						<br/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.action('create')}>Create</p>
							<p className="button" onClick={() => this.action('cancel')}>Cancel</p>
						</div>
					</div>
				}
				case 'upload': {
					return <div className="warning-popup">
						<h4>New file</h4>
						<p>Choose file to upload</p>
						{/*<input type="file" value={this.state.nameValue} onChange={this.handleChange} autoFocus={true}/>*/}
						<br/>

						<input type="file" onChange={e => this.changeFile(e)}/>
						<img src={this.state.file} alt="preview"/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.actionUpload()}>Upload</p>
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
				case 'show': {
					return <div className="warning-popup">
						<h4>File content</h4>
						<img id="binaryImg" src={'data:image/png;base64, ' + this.state.preview} height="200" alt="Image preview..."/>
						<br/>
						<div className="two-btn-container">
							<p className="button" onClick={() => this.action('download')}>Download</p>
							<p className="button" onClick={() => this.action('cancel')}>Cancel</p>
						</div>
					</div>
				}
				case 'success': {
					return <div className="warning-popup">
						<h4>Success</h4>
						<p>Action completed successfully</p>
						<p className="button" onClick={() => this.action('OK')}>OK</p>
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
	actionUpload() {
		axios.post(apiFile, this.state.binary, { headers: { 'Content-Type': 'multipart/form-data', 'accept': 'application/hal+json' } }).then((r) => {
			this.sendPopupAction('success')

		}).catch((e) => {
			this.sendPopupAction('error')

		}).then(() => {

		});
	}
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
			case 'OK': {
				this.sendPopupAction('OK');
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
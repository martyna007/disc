import axios from 'axios';
import React, { Component } from 'react';
import Loader from '../components/Loader'
import Folder from '../components/Folder';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			details: '',
			parent: 'http://mydisc.xyz:8080/api/folders/root',
			parentName: '',
			children: [],
			popupType: '',
			popup: false,
			currentItem: {},
			currentId: null,
			currentName: 'root',
			nameValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		axios.get(this.state.parent).then((r) => {
			axios.get(r.data._links.children.href).then((r2) => {
				this.setState({
					loaded: true,
					children: r2.data._embedded.folderResourceList
				});

			});
		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});

		document.addEventListener('click', this.handleClickOutside, false);
	}
	handleClickOutside = e => {
		if (e.target.className !== 'folder-checkbox') {
			this.setState({
				details: ''
			});
			let eventNodes = document.getElementsByClassName('folder-checkbox');
			Object.keys(eventNodes).forEach(function (key) {
				eventNodes[key].checked = false;
			});
		}
	};
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}
	handleClick = (folder, e, data) => {
		if (typeof folder._links.self.href.split('http://mydisc.xyz:8080/api/folders/')[1] !== 'undefined') {
			this.setState({
				currentItem: folder,
				currentId: folder._links.self.href.split('http://mydisc.xyz:8080/api/folders/')[1]
			});
		} else {
			this.setState({
				currentItem: folder,
				currentId: null
			});
		}

		switch (data.action) {
			case 'delete': {
				this.setState({
					popupType: 'delete',
					popup: true
				});
				break;
			}
			case 'open': {
				this.setState({
					loaded: false
				});
				axios.get(folder._links.children.href).then((r) => {
					if (Object.getOwnPropertyNames(r.data).length !== 0) {
						this.setState({
							loaded: true,
							details: '',
							parent: folder._links.self.href,
							children: r.data._embedded.folderResourceList,
							popupType: '',
							popup: false,
							currentItem: {},
							nameValue: ''
						});
					} else {
						this.setState({
							loaded: true,
							details: '',
							parent: folder._links.self.href,
							children: [],
							popupType: '',
							popup: false,
							currentItem: {},
							nameValue: ''
						});
					}
				}).catch((e) => {

				}).then(() => {
					this.setState({
						loaded: true
					});
				});
				break;
			}
			case 'rename': {
				// axios.get(folder._links.delete.href).then((r) => {
				//
				// }).catch((e) => {
				//
				// }).then(() => {
				//
				// });
				break;
			}
			case 'details': {
				// axios.get(folder._links.delete.href).then((r) => {
				//
				// }).catch((e) => {
				//
				// }).then(() => {
				//
				// });
				break;
			}
			default: {

			}
		}
	};


	showDetails(folder) {
		this.setState({
			details: folder.folder.name
		})

	};
	detailsToggle = () => {
		if (this.state.details !== '') {
			return <div className="details-container">
				<h4>Name: {this.state.details}</h4>
				<h4>Weight: {this.state.details}</h4>
				<h4>Empty: {this.state.details}</h4>
			</div>
		}
	};

	popupToggle = () => {
		if (this.state.popup) {
			switch (this.state.popupType) {
				case 'delete': {
					return <div className="warning-popup">
						<h4>Are you sure?</h4>
						<p>Do you really want to delete this item? There is no turning back</p>
						<p className="button" onClick={this.deleteAction}>Delete</p>
						<p className="button" onClick={this.cancelAction}>Cancel</p>
					</div>
				}
				case 'create': {
					return <div className="warning-popup">
						<h4>New folder</h4>
						<p>Enter name below</p>
						<input type="text" value={this.state.nameValue} onChange={this.handleChange}/>
						<br/>
						<p className="button" onClick={this.createAction}>Create</p>
						<p className="button" onClick={this.cancelAction}>Cancel</p>
					</div>
				}
				case 'success': {
					return <div className="warning-popup">
						<h4>Success</h4>
						<p>Action completed successfully</p>
						<p className="button" onClick={this.cancelAction}>OK</p>
					</div>
				}
				case 'error': {
					return <div className="warning-popup">
						<h4>Error</h4>
						<p>An error occured, try again</p>
						<p className="button" onClick={this.cancelAction}>OK</p>
					</div>
				}
				default: {

				}
			}
		}
	};
	handleChange(event) {
		this.setState({
			nameValue: event.target.value
		});
	}

	cancelAction = () => {
		this.setState({
			popup: false
		});
		this.componentDidMount();
	};
	deleteAction = () => {
		let item = this.state.currentItem;
		axios.delete(item._links.delete.href).then((r) => {
			this.setState({
				popup: true,
				popupType: 'success'
			});
		}).catch((e) => {
			this.setState({
				popup: true,
				popupType: 'error'
			})
		}).then(() => {

		});
	};
	createAction = () => {
		axios.post('http://mydisc.xyz:8080/api/folders', {name: this.state.nameValue, parentId: this.state.currentId}).then((r) => {
			this.setState({
				popup: true,
				popupType: 'success'
			});

		}).catch((e) => {
			this.setState({
				popup: true,
				popupType: 'error'
			})
		}).then(() => {

		});
	};
	createItem = () => {
		this.setState({
			popup: true,
			popupType: 'create'
		});
	};

	render() {
		if (this.state.loaded && this.state.children.length) {
			return (
				<div>
					<div className="breadcrumbs">
						<h2>{this.state.parentName + '/' + this.state.currentName}</h2>
					</div>
					<div className="container">
						{this.popupToggle()}
						<div className="main-container">
							<div className="border-container">
							<span>
								{this.state.children.map((folder, index) => {
									return <div key={index} className="folder-container-wrapper"  onClick={this.showDetails.bind(this, folder)}>
										<ContextMenuTrigger id={index + 'folder'}>
											<Folder name={folder.folder.name} links={folder._links} id={index + 'folder'} />
										</ContextMenuTrigger>
										<ContextMenu id={index + 'folder'}>
											<MenuItem data={{action: 'open'}} onClick={this.handleClick.bind(this, folder)}>
												<span className="menu-item">
													<i className="material-icons">subdirectory_arrow_right</i>Open
												</span>
											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{action: 'rename'}} onClick={this.handleClick.bind(this, folder)}>
												<span className="menu-item">
													<i className="material-icons">edit</i>Change name
												</span>

											</MenuItem>
											<MenuItem data={{action: 'details'}} onClick={this.handleClick.bind(this, folder)}>
												<span className="menu-item">
													<i className="material-icons">subject</i>Details
												</span>

											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{action: 'delete'}} onClick={this.handleClick.bind(this, folder)}>
												<span className="menu-item">
													<i className="material-icons">delete</i>Delete
												</span>

											</MenuItem>
										</ContextMenu>
									</div>
								})}
							</span>
							</div>
						</div>
						<div className="aside-container">
							<p className="button" onClick={this.createItem}><i className="material-icons">
								add
							</i>Create new folder</p>
							<p className="button"><i className="material-icons">
								add
							</i>Add new file</p>
							{this.detailsToggle()}

						</div>

					</div>
				</div>
			);
		} else if (this.state.loaded) {
			return (
				<div>
					<div className="breadcrumbs">
						<h2>{this.state.parentName + '/' + this.state.currentName}</h2>
					</div>
					<div className="container">

						{this.popupToggle()}
						<div className="main-container">
							<div className="border-container">
							<span>
							</span>
							</div>
						</div>
						<div className="aside-container">
							<p className="button" onClick={this.createItem}><i className="material-icons">
								add
							</i>Create new folder</p>
							<p className="button"><i className="material-icons">
								add
							</i>Add new file</p>
							{this.detailsToggle()}

						</div>

					</div>
				</div>
			);
		} else {
			return <div>
					<Loader/>
				</div>
		}

	}
}

export default Home;

import axios from 'axios';
import React, { Component } from 'react';
import Loader from '../components/Loader'
import Folder from '../components/Folder';
import File from '../components/File';
import Popup from '../components/Popup';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const api = 'http://mydisc.xyz/api/folders/';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			details: {},
			popupType: '',
			popup: false,
			folderId: 'root',
			folderChildren: [],
			folderData: {},
			selectedItem: {},
			selectedItemDetails: {},
			files: []
		};
		this.getPopupAction = this.getPopupAction.bind(this);
	}
	componentDidMount() {
		axios.get(api + this.state.folderId).then((r) => {
			this.getChildren(r.data);
		}).catch((e) => {

		}).then(() => {

		});

		axios.get(api + this.state.folderId + '/files').then((r) => {
			this.setState({
				files: Object.getOwnPropertyNames(r.data).length ? r.data._embedded.fileResourceList : [],
			});
		}).catch((e) => {

		}).then(() => {

		});

		document.addEventListener('click', this.handleClickOutside, false);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}

	//click outside context menu
	handleClickOutside = e => {
		if (e.target.className !== 'folder-checkbox') {
			this.setState({
				selectedItemDetails: {}
			});
			let eventNodes = document.getElementsByClassName('folder-checkbox');
			Object.keys(eventNodes).forEach(function (key) {
				eventNodes[key].checked = false;
			});
		}
	};

	//context menu click
	handleClick = (item, e, data) => {
		this.setState({
			selectedItem: item,
			selectedItemDetails: {}
		});
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
				this.getChildren(item);
				break;
			}
			case 'show': {
				this.setState({
					popupType: 'show',
					popup: true
				});
				break;
			}
			case 'rename': {
				this.setState({
					popupType: 'rename',
					popup: true
				});
				break;
			}
			case 'details': {
				break;
			}
			default: {

			}
		}
	};
	getChildren = item => {
		axios.get(item._links.children.href).then((r) => {
			this.setState({
				loaded: true,
				popupType: '',
				popup: false,
				folderId: item.folder.id,
				folderChildren: Object.getOwnPropertyNames(r.data).length ? r.data._embedded.folderResourceList : [],
				folderData: item,
				selectedItem: {},
				selectedItemDetails: {}
			});
		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});
	};
	getParent = () => {
		axios.get(this.state.folderData._links.parent.href).then((r) => {
			this.getChildren(r.data);
		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});
	};
	// getFile = item => {
	// 	axios.get(item._links.download.href).then((r) => {
	// 		this.setState({
	// 			loaded: true,
	// 			popupType: '',
	// 			popup: false,
	// 			selectedItem: {},
	// 			selectedItemDetails: {}
	// 		});
	// 	}).catch((e) => {
	//
	// 	}).then(() => {
	// 		this.setState({
	// 			loaded: true
	// 		});
	// 	});
	// };

	// no button yet
	getRoot = () => {
		axios.get(api + 'root').then((r) => {
			this.getChildren(r.data);
		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});
	};

	// no point in showing details yet
	getDetailsFile(file) {
		// console.log(file);
		// axios.get(file._links.self.href).then((r) => {
		// 	this.setState({
		// 		loaded: true,
		// 		selectedItem: file,
		// 		selectedItemDetails: r.data.file
		// 	});
		//
		// }).catch((e) => {
		//
		// }).then(() => {
		// 	this.setState({
		// 		loaded: true
		// 	});
		// });
	};
	getDetails(folder) {
		axios.get(folder._links.self.href).then((r) => {
			this.setState({
				loaded: true,
				selectedItem: folder,
				selectedItemDetails: r.data.folder
			});

		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});

	};
	convertISO = date => {
		let day = date.split('T')[0];
		let time = date.split('T')[1];
		time = time.split('+')[0];
		return day + ' ' + time.slice(0, 5);
	};
	detailsToggle = () => {
		if (Object.getOwnPropertyNames(this.state.selectedItemDetails).length) {
			return <div className="details-container">
				<h4>Name: {this.state.selectedItemDetails.name}</h4>
				<h4>Created: {this.convertISO(this.state.selectedItemDetails.created_at)}</h4>
				<h4>Modified: {this.convertISO(this.state.selectedItemDetails.updated_at)}</h4>
			</div>
		}
	};

	getPopupAction = (action) => {
		switch (action) {
			case 'success': {
				this.setState({
					popup: true,
					popupType: 'success'
				});
				break;
			}
			case 'error': {
				this.setState({
					popup: true,
					popupType: 'error'
				});
				break;
			}
			case 'cancel': {
				this.setState({
					popup: false
				});
				break;
			}
			case 'OK': {
				this.setState({
					popup: false
				});
				this.componentDidMount();
				break;
			}
			default: {

			}
		}
	};

	createItem = () => {
		this.setState({
			popup: true,
			popupType: 'create'
		});
	};
	createFile = () => {
		this.setState({
			popup: true,
			popupType: 'upload'
		});
	};
	showPopup = () => {
		if (this.state.popup) {
			return <Popup type={this.state.popupType} popupAction={this.getPopupAction} parent={this.state.folderData} selectedItem={this.state.selectedItem}/>

		}
	};
	showBackButton = () => {
		if (this.state.folderId !== 'root') {
			return <i className="material-icons" onClick={this.getParent}>keyboard_return</i>
		}
	};

	render() {
		if (this.state.loaded && this.state.folderChildren.length) {
			return (
				<div>
					<div className="breadcrumbs">
						<h2>{'/' + this.state.folderData.folder.name}</h2>
						{this.showBackButton()}
					</div>
					<div className="container">
						{this.showPopup()}
						<div className="main-container">
							<div className="border-container">
							<span>
								{this.state.folderChildren.map((folder, index) => {
									return <div key={index} className="folder-container-wrapper" onClick={this.getDetails.bind(this, folder)}>
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
								{this.state.files.map((file, index) => {
									return <div key={index} className="folder-container-wrapper file-container-wrapper" onClick={this.getDetailsFile.bind(this, file)}>
										<ContextMenuTrigger id={index + 'file'}>
											<File name={file.file.name} links={file._links} id={index + 'file'} file={file}/>
										</ContextMenuTrigger>
										<ContextMenu id={index + 'file'}>
											<MenuItem data={{action: 'show'}} onClick={this.handleClick.bind(this, file)}>
												<span className="menu-item">
													<i className="material-icons">get_app</i>Preview
												</span>
											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{action: 'details'}} onClick={this.handleClick.bind(this, file)}>
												<span className="menu-item">
													<i className="material-icons">subject</i>Details
												</span>

											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{action: 'delete'}} onClick={this.handleClick.bind(this, file)}>
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
							<p className="button" onClick={this.createFile}><i className="material-icons">
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
						<h2>{'/' + this.state.folderData.folder.name}</h2>
						{this.showBackButton()}
					</div>
					<div className="container">
						{this.showPopup()}
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
							<p className="button" onClick={this.createFile}><i className="material-icons">
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

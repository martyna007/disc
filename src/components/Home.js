import axios from 'axios'
import React, { Component } from 'react'
import Loader from './Loader'
import FolderList from './FolderList'
import FileList from './FileList'
import Modal from './Modal'

const api = 'http://localhost:8888/api/folders/';

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
		this.getDetails = this.getDetails.bind(this);
		this.getDetailsFile = this.getDetailsFile.bind(this);
	}
	componentDidMount() {
		axios.get(api + this.state.folderId).then((r) => {
			this.getChildren(r.data);
			this.getFiles(r.data);
		});
		document.addEventListener('click', this.handleClickOutside, false);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}

	getChildren = (item) => {
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
		});
	};
	getFiles = (item) => {
		axios.get(item._links.files.href).then((r) => {
			this.setState({
				files: Object.getOwnPropertyNames(r.data).length ? r.data._embedded.fileResourceList : [],
			});
		});
	};

	getParent = () => {
		axios.get(this.state.folderData._links.parent.href).then((r) => {
			this.getChildren(r.data);
			this.getFiles(r.data);
		});
	};

	//click outside context menu
	handleClickOutside = (e) => {
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
	handleClickFromItem = (item, action) => {
		this.setState({
			selectedItem: item,
			selectedItemDetails: {}
		});
		switch (action) {
			case 'delete': {
				this.setState({
					popupType: 'delete',
					popup: true
				});
				break;
			}
			case 'details': {
				break;
			}
			case 'download': {
				this.setState({
					popupType: 'download',
					popup: true
				});
				break;
			}
			case 'move': {
				this.setState({
					popupType: 'move',
					popup: true
				});
				break;
			}
			case 'open': {
				this.setState({
					loaded: false
				});
				this.getChildren(item);
				this.getFiles(item);
				break;
			}
			case 'preview': {
				this.setState({
					popupType: 'preview',
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
			default: {

			}
		}
	};

	// no button yet - is it needed?
	getRoot = () => {
		axios.get(api + 'root').then((r) => {
			this.getChildren(r.data);
			this.getFiles(r.data);
		});
	};

	getDetailsFile(file) {
		axios.get(file._links.self.href).then((r) => {
			this.setState({
				loaded: true,
				selectedItem: file,
				selectedItemDetails: r.data.file
			});

		});
	};

	getDetails(folder) {
		axios.get(folder._links.self.href).then((r) => {
			this.setState({
				loaded: true,
				selectedItem: folder,
				selectedItemDetails: r.data.folder
			});

		});
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
			case 'OK': {
				this.setState({
					popup: false
				});
				this.componentDidMount();
				break;
			}
			case 'cancel': {
				this.setState({
					popup: false
				});
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

	showBackButton = () => {
		if (this.state.folderId !== 'root') {
			return <i className="material-icons" onClick={this.getParent}>keyboard_return</i>
		}
	};

	render() {
		if (this.state.loaded && (this.state.folderChildren.length || this.state.files.length)) {
			return <span>
				<div className="breadcrumbs">
					<h2>{'/' + this.state.folderData.folder.name}</h2>
					{this.showBackButton()}
				</div>	
				{this.state.popup ? (<Modal type={this.state.popupType} popupAction={this.getPopupAction} parent={this.state.folderData} selectedItem={this.state.selectedItem} />) : null}
				<FolderList folderList={this.state.folderChildren} getDetails={this.getDetails} handleClickFromItem={this.handleClickFromItem} />
				<FileList fileList={this.state.files} getDetailsFile={this.getDetailsFile} handleClickFromItem={this.handleClickFromItem} />
			</span>
		} else if (this.state.loaded) {
			return <span>
				<div className="breadcrumbs">
					<h2>{'/' + this.state.folderData.folder.name}</h2>
					{this.showBackButton()}
				</div>	
				{this.state.popup ? (<Modal type={this.state.popupType} popupAction={this.getPopupAction} parent={this.state.folderData} selectedItem={this.state.selectedItem} />) : null}
			</span>
		} else {
			return <div>
				<Loader />
			</div>
		}
	}
}

export default Home;

import axios from 'axios';
import React, { Component } from 'react';
import Loader from '../components/Loader'
import Folder from '../components/Folder';
import Popup from '../components/Popup';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			details: {},
			popupType: '',
			popup: false,
			parentItem: {
				id: '',
				name: ''
			},
			parentLink: '',
			children: [],
			currentItem: {
				id: 'root',
				name: 'root'
			},
		};
		//this.handleChange = this.handleChange.bind(this);
		this.getPopupAction = this.getPopupAction.bind(this);
	}
	componentDidMount() {
		axios.get('http://mydisc.xyz/api/folders/' + this.state.currentItem.id).then((r) => {
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
		this.setState({
			currentItem: folder
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
				this.getChildItem(folder);
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
	getChildItem = item => {
		axios.get(item._links.children.href).then((r) => {
			if (Object.getOwnPropertyNames(r.data).length !== 0) {
				this.setState({
					parentLink: item._links.parent.href,
					children: r.data._embedded.folderResourceList,
					popupType: '',
					popup: false,
					detailsLink: item._links.self.href
				});
			} else {
				this.setState({
					parentLink: item._links.parent.href,
					children: [],
					popupType: '',
					popup: false,
					detailsLink: item._links.self.href
				});
			}
			console.log(this.state.parentLink);
			console.log(this.state.currentItem);
			this.getDetailsOfItem(item._links.self.href);

		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});
	};
	getDetailsOfItem = link => {
		axios.get(link).then((r) => {
			console.log(r);
			this.setState({
				loaded: true,
				details: r.data.folder
			});
			console.log(this.state.details);

		}).catch((e) => {

		}).then(() => {
			this.setState({
				loaded: true
			});
		});
	};

	showDetails(folder) {
		this.setState({
			details: folder.folder
		})

	};
	detailsToggle = () => {
		if (this.state.details) {
			return <div className="details-container">
				<h4>Name: {this.state.details.name}</h4>
				<h4>Created: {this.state.details.created_at}</h4>
				<h4>Modified: {this.state.details.updated_at}</h4>
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
				// this.componentDidMount();
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
	showPopup = () => {
		if (this.state.popup) {
			return <Popup type={this.state.popupType} popupAction={this.getPopupAction} parentId={this.state.currentId} currentItem={this.state.currentItem}/>

		}
	};

	render() {
		if (this.state.loaded && this.state.children.length) {
			return (
				<div>
					<div className="breadcrumbs">
						<h2>{'/' + this.state.currentItem.name}</h2>
					</div>
					<div className="container">
						{this.showPopup()}
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
						<h2>{'/' + this.state.currentItem.name}</h2>
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

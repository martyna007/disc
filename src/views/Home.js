import React, { Component } from 'react';
import Loader from '../components/Loader'
import Folder from '../components/Folder'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const disc = {
	_embedded: {
		folderResourceList: [
			{
				_links: {
					self: {
						href: "http://localhost:8080/api/folders/768b6bce-da74-4355-817b-615880976c39"
					},
					children: {
						href: "http://localhost:8080/api/folders/root/children"
					},
					delete: {
						href: "http://localhost:8080/api/folders/768b6bce-da74-4355-817b-615880976c39"
					}
				},
				folder: {
					name: "childXrxexnX"
				}
			},
			{
				_links: {
					self: {
						href: "http://localhost:8080/api/folders/1b044aa7-8e64-421e-89ac-d1f420c5b063"
					},
					children: {
						href: "http://localhost:8080/api/folders/root/children"
					},
					delete: {
						href: "http://localhost:8080/api/folders/1b044aa7-8e64-421e-89ac-d1f420c5b063"
					}
				},
				folder: {
					name: "childXrxexnX"
				}
			},
			{
				_links: {
					self: {
						href: "http://localhost:8080/api/folders/340fbf2f-270c-4245-b6b4-f01fbf54c882"
					},
					children: {
						href: "http://localhost:8080/api/folders/root/children"
					},
					delete: {
						href: "http://localhost:8080/api/folders/340fbf2f-270c-4245-b6b4-f01fbf54c882"
					}
				},
				folder: {
					name: "blablabla"
				}
			}
		]
	}
};
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			disc: disc._embedded.folderResourceList,
			details: ''
		};
	}
	componentDidMount() {
		this.setState({
			loaded: true
		});
		document.addEventListener('click', this.handleClickOutside, false);
	}
	componentWillMount() {

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
	handleClick = (e, data) => {
		console.log(data.foo);
	};
	showDetails(folder) {
		this.setState({
			details: folder.folder.name
		})

	};
	detailsToggle = () => {
		if (this.state.details !== '') {
			return <div>
				<p>Details</p>
				<p>Name: {this.state.details}</p>
			</div>
		}
	};
	render() {
		if (this.state.loaded) {
			return (
				<div className="container">
					<div className="main-container">
						<div className="border-container">
							<span>
								{this.state.disc.map((folder, index) => {
									return <div key={index} className="folder-container-wrapper"  onClick={this.showDetails.bind(this, folder)}>
										<ContextMenuTrigger id={index + 'folder'}>
											<Folder name={folder.folder.name} links={folder._links} id={index + 'folder'} />
										</ContextMenuTrigger>
										<ContextMenu id={index + 'folder'}>
											<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
												<span className="menu-item">
													<i className="material-icons">subdirectory_arrow_right</i>Open
												</span>

											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
												<span className="menu-item">
													<i className="material-icons">edit</i>Change name
												</span>

											</MenuItem>
											<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
												<span className="menu-item">
													<i className="material-icons">subject</i>Details
												</span>

											</MenuItem>
											<MenuItem divider />
											<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
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
						<p><i className="material-icons">
							add
						</i>Create new folder</p>
						<p><i className="material-icons">
							add
						</i>Add new file</p>
						{this.detailsToggle()}

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

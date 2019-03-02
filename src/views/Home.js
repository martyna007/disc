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
		};
	}
	componentDidMount() {
		this.setState({
			loaded: true
		})
	}
	handleClick = (e, data) => {
		console.log(data.foo);
	};

	render() {
		if (this.state.loaded) {
			return (
				<div>
					<div className="main-container">
						{this.state.disc.map((folder, index) => {
							return <div key={index} className="folder-container-wrapper">
								<ContextMenuTrigger id={index + 'folder'}>
									<Folder name={folder.folder.name} links={folder._links} />
								</ContextMenuTrigger>

								<ContextMenu id={index + 'folder'}>
									<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
										Open
									</MenuItem>
									<MenuItem divider />
									<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
										Change name
									</MenuItem>
									<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
										Details
									</MenuItem>
									<MenuItem divider />
									<MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
										Delete
									</MenuItem>
								</ContextMenu>
							</div>
						})}
					</div>
					<div className="aside-container">
						<p>Create new folder</p>
						<p>Add new file</p>
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

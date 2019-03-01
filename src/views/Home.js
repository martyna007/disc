import React, { Component } from 'react';
import Loader from '../components/Loader'
import Folder from '../components/Folder'

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


	render() {
		if (this.state.loaded) {
			return (
				<div>
					{this.state.disc.map((folder, index) => {
						return <Folder key={index} name={folder.folder.name} link={folder._links.children.href}/>
					})}
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

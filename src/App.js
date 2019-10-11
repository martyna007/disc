import React, { Component } from 'react'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import './styles/style.css'

class App extends Component {
	render() {
		return (
				<div className="App">
					<div>
						<div className="container">
							<div className="main-container">
								<div className="border-container">
									<Home />
								</div>
							</div>
							<Sidebar createItem={this.createItem} createFile={this.createFile} />
						</div>
					</div>
				</div>
		)
	}
}

export default App;

import React, { Component } from 'react';
import Home from './views/Home';
import './styles/style.css'
import Loader from "./components/Loader";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		};
	}
	componentDidMount() {
		this.setState({
			loaded: true
		})
	}
	render() {
		if (this.state.loaded) {
			return <div className="App">
				<Home/>
			</div>
		} else {
			return <Loader/>
		}

	}
}

export default App;

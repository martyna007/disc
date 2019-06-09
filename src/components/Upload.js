// import React, { Component } from 'react'
//
// class Upload extends Component {
//
// 	constructor(props) {
// 		super(props);
// 	}
// 	handleChangeFile = event => {
// 		let formData = new FormData();
//
// 		var file = event.target.files[0];
//
// 		formData.append('file', file);
// 		// var reader = new FileReader();
// 		// reader.onload = event => {
// 		// 	this.setState({
// 		// 		binary: event.target.result
// 		// 	})
// 		// };
// 		// reader.readAsText(file);
// 		console.log(formData);
// 		this.props.binary = formData;
// 	};
//
//
// 	render() {
// 		return (
// 			<div>
// 				<input type="file" onChange={e => this.handleChangeFile(e)}/>
// 			</div>
// 		);
// 	}
// }
// export default Upload;
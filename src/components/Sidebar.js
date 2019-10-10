import React, { Component } from 'react';

class Sidebar extends Component {

    convertISO = (date) => {
		let day = date.split('T')[0];
		let time = date.split('T')[1];
		time = time.split('+')[0];
		return day + ' ' + time.slice(0, 5);
	};

	detailsToggle = () => {
        let date = this.props.item;
        if (Object.getOwnPropertyNames(date).length) {
            if (date.hasOwnProperty('created_at')) {
                return <div className="details-container">
					<h4>Name: {date.name}</h4>
					<h4>Created: {this.convertISO(date.created_at)}</h4>
					<h4>Modified: {this.convertISO(date.updated_at)}</h4>
				</div>
            } else {
                return <div className="details-container">
                	<h4>Name: {date.name}</h4>
                	<h4>Size: {date.size} bytes</h4>
                	<h4>Type: {date.type}</h4>
                </div>
            }
        }
	};

    render() {
        return(
            <div className="aside-container">
                <p className="button" onClick={this.props.createItem}><i className="material-icons">
                    add
                </i>Create new folder</p>
                <p className="button" onClick={this.props.createFile}><i className="material-icons">
                    add
                </i>Add new file</p>
                {this.detailsToggle()}
            </div>
        )
    }

}
export default Sidebar
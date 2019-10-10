import React, { Component } from 'react'
import Folder from './Folder'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

class FolderList extends Component {

	handleClick = (item, e, data) => {
        this.props.handleClickFromItem(item, data.action);
	};

    render() {
        return (
            <span>
                {this.props.folderList.map((folder, index) => {
                    return <div key={index} className="folder-container-wrapper" onClick={() => this.props.getDetails(folder)}>
                        <ContextMenuTrigger id={index + 'folder'}>
                            <Folder name={folder.folder.name} links={folder._links} id={index + 'folder'} />
                        </ContextMenuTrigger>
                        <ContextMenu id={index + 'folder'}>
                            <MenuItem data={{ action: 'open' }} onClick={this.handleClick.bind(this, folder)}>
                                <span className="menu-item">
                                    <i className="material-icons">subdirectory_arrow_right</i>Open
												</span>
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ action: 'rename' }} onClick={this.handleClick.bind(this, folder)}>
                                <span className="menu-item">
                                    <i className="material-icons">edit</i>Rename
												</span>
                            </MenuItem>
                            <MenuItem data={{ action: 'move' }} onClick={this.handleClick.bind(this, folder)}>
                                <span className="menu-item">
                                    <i className="material-icons">forward</i>Move
												</span>
                            </MenuItem>
                            <MenuItem data={{ action: 'details' }} onClick={this.handleClick.bind(this, folder)}>
                                <span className="menu-item">
                                    <i className="material-icons">subject</i>Details
												</span>
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ action: 'delete' }} onClick={this.handleClick.bind(this, folder)}>
                                <span className="menu-item">
                                    <i className="material-icons">delete</i>Delete
												</span>
                            </MenuItem>
                        </ContextMenu>
                    </div>
                })}
            </span>
        )
    }
}
export default FolderList
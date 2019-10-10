import React, { Component } from 'react'
import File from './File'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

class FileList extends Component {

    handleClick = (item, e, data) => {
        this.props.handleClickFromItem(item, data.action);
	};

    render() {
        return (
            <span>
                {this.props.fileList.map((file, index) => {
                    return <div key={index} className="folder-container-wrapper file-container-wrapper" onClick={() => this.props.getDetailsFile(file)}>
                        <ContextMenuTrigger id={index + 'file'}>
                            <File name={file.file.name} links={file._links} id={index + 'file'} file={file} />
                        </ContextMenuTrigger>
                        <ContextMenu id={index + 'file'}>
                            <MenuItem data={{ action: 'preview' }} onClick={this.handleClick.bind(this, file)}>
                                <span className="menu-item">
                                    <i className="material-icons">visibility</i>Preview
												</span>
                            </MenuItem>
                            <MenuItem data={{ action: 'download' }} onClick={this.handleClick.bind(this, file)}>
                                <span className="menu-item">
                                    <i className="material-icons">get_app</i>Download
												</span>
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ action: 'move' }} onClick={this.handleClick.bind(this, file)}>
                                <span className="menu-item">
                                    <i className="material-icons">forward</i>Move
												</span>
                            </MenuItem>
                            <MenuItem data={{ action: 'details' }} onClick={this.handleClick.bind(this, file)}>
                                <span className="menu-item">
                                    <i className="material-icons">subject</i>Details
												</span>
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ action: 'delete' }} onClick={this.handleClick.bind(this, file)}>
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
export default FileList
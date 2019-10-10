import React, { Component } from 'react';
import axios from "axios";
const api = 'http://localhost:8888/api/folders/';
let apiFile = '';

class innerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            binary: {},
            preview: '',
            file: null,
            siblingFolders: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.type === 'rename') {
            this.setState({
                nameValue: this.props.selectedItem.folder.name
            })
        }
        if (this.props.type === 'upload' && this.props.parent.folder.id === 'root') {
            apiFile = api + 'root/files'
        } else if (this.props.type === 'upload') {
            apiFile = api + this.props.parent.folder.id + '/files'
        }
        if (this.props.type === 'preview') {
            axios.get(this.props.selectedItem._links.download.href).then((r) => {
                this.setState({
                    preview: r.data
                });
            });
        }

        if (this.props.type === "move") {
            axios.get(this.props.parent._links.children.href).then((r) => {
                let siblingList = [];

                Object.getOwnPropertyNames(r.data).length ? siblingList = r.data._embedded.folderResourceList : siblingList = [];

                if (this.props.selectedItem.hasOwnProperty('folder')) {
                    let siblings = siblingList.filter(folder => {
                        return folder.folder.id !== this.props.selectedItem.folder.id
                    })
                    this.setState({
                        siblingFolders: siblings
                    });
                } else if (this.props.selectedItem.hasOwnProperty('file')) {
                    this.setState({
                        siblingFolders: siblingList
                    });
                }
            });
        }

        if (this.props.type === "download") {
            this.downloadFile(this.props.selectedItem._links.download.href, this.props.selectedItem.file.name);
        }
    }

    inputTypeModal = (title, subtitle, button) => {
        return <div className="warning-popup">
            <h4>{title}</h4>
            <p>{subtitle}</p>
            <input type="text" value={this.state.nameValue} onChange={this.handleChange} autoFocus={true} />
            <br />
            {this.renderTwoButtons(button)}
        </div>
    }
    areYouSureTypeModal = (title, subtitle, button) => {
        return <div className="warning-popup">
            <h4>{title}</h4>
            <p>{subtitle}</p>
            {this.renderTwoButtons(button)}
        </div>
    }
    selectTypeModal = (title, button) => {
        return <div className="warning-popup">
            <h4>{title}</h4>
            <select value={this.state.nameValue} onChange={this.handleChange}>
                <option value="">Select folder</option>
                <option value="root">root</option>
                {this.state.siblingFolders.map((folder, index) => {
                    return <option key={index} value={folder.folder.id}>{folder.folder.name}</option>
                })}
            </select>
            <br />
            {this.renderTwoButtons(button)}
        </div>
    }
    previewTypeModal = (title, button) => {
        return <div className="warning-popup">
            <h4>{title}</h4>
            <select value={this.state.nameValue} onChange={this.handleChange}>
                <option value="">Select folder</option>
                <option value="root">root</option>
                {this.state.siblingFolders.map((folder, index) => {
                    return <option key={index} value={folder.folder.id}>{folder.folder.name}</option>
                })}
            </select>
            <br />
            {this.renderTwoButtons(button)}
        </div>
    }
    simpleModal = (title, content, button) => {
        return <div className="warning-popup">
            <h4>{title}</h4>
            <p>{content}</p>
            <p className="button" onClick={() => this.action(button.id)}>{button.name}</p>
        </div>
    }
    renderTwoButtons = (button) => {
        return <div className="two-btn-container">
            <p className="button" onClick={() => this.action(button.id)}>{button.name}</p>
            <p className="button" onClick={() => this.action('cancel')}>Cancel</p>
        </div>
    }

    handleChange(event) {
        this.setState({
            nameValue: event.target.value
        });
    }

    sendPopupAction(action) {
        this.props.popupAction(action);
    }

    changeFile = event => {
        let formData = new FormData();
        let file = event.target.files[0];

        formData.append('file', file);
        this.setState({
            binary: formData,
            file: URL.createObjectURL(file)
        });
    };

    renderPopup = () => {
        if (this.props.type) {
            switch (this.props.type) {
                case 'create': {
                    return this.inputTypeModal('New folder', 'Enter name below', { id: 'create', name: 'Create' })
                }
                case 'delete': {
                    return this.areYouSureTypeModal('Are you sure?', 'Do you really want to delete this item? There is no turning back', { id: 'delete', name: 'Delete' })
                }
                case 'move': {
                    return this.selectTypeModal('Move to different folder', { id: 'move', name: 'Move' })
                }
                case 'preview': {
                    if (this.props.selectedItem.file.type === 'text/plain') {
                        return <div className="warning-popup">
                            <h4>File content</h4>
                            <p>{this.state.preview.substring(0, 200)}</p>
                            <br />
                            {this.renderTwoButtons({id: 'download', name: 'Download'})}
                        </div>
                    } else if (this.props.selectedItem.file.type === 'image/png') {
                        return <div className="warning-popup">
                            <h4>File content</h4>
                            <div className="center-img">
                                <img src={this.props.selectedItem._links.download.href} height="200" alt="Preview" />
                            </div>
                            <br />
                            {this.renderTwoButtons({id: 'download', name: 'Download'})}
                        </div>
                    }
                    break;
                }
                case 'rename': {
                    return this.inputTypeModal('New folder name', 'Enter new name below', { id: 'rename', name: 'Change' })
                }
                case 'upload': {
                    return <div className="warning-popup">
                        <h4>New file</h4>
                        <p>Choose file to upload</p>
                        <br />
                        <input type="file" onChange={e => this.changeFile(e)} />
                        {/*<img src={this.state.file} alt="preview"/>*/}
                        {this.renderTwoButtons({id: 'upload', name: 'Upload'})}
                    </div>
                }
                case 'success': {
                    return this.simpleModal('Success', 'Action completed successfully', { id: 'OK', name: 'OK' })
                }
                case 'error': {
                    return this.simpleModal('Error', 'An error occured, try again', { id: 'cancel', name: 'OK' })
                }
                default: {

                }
            }
        }
    }

    actionUpload() {
        axios.post(apiFile, this.state.binary, { headers: { 'Content-Type': 'multipart/form-data', 'accept': 'application/hal+json' } }).then((r) => {
            this.sendPopupAction('success')

        }).catch((e) => {
            this.sendPopupAction('error')

        });
    }

    downloadFile = (url, filename) => {
        fetch(url).then(function (t) {
            return t.blob().then((b) => {
                let a = document.createElement("a");
                a.href = URL.createObjectURL(b);
                a.setAttribute("download", filename);
                a.click();
            }
            );
        }).then((e) => {
            this.sendPopupAction('success')
        }).catch((e) => {
            this.sendPopupAction('error')
        });
    }

    action(action) {
        switch (action) {
            case 'create': {
                axios.post(api, { name: this.state.nameValue, parentId: this.props.parent.folder.id === 'root' ? null : this.props.parent.folder.id }).then((r) => {
                    this.sendPopupAction('success')
                }).catch((e) => {
                    this.sendPopupAction('error')
                });
                break;
            }
            case 'delete': {
                let item = this.props.selectedItem;

                axios.delete(item._links.delete.href).then((r) => {
                    this.sendPopupAction('success')
                }).catch((e) => {
                    this.sendPopupAction('error')
                });
                break;
            }
            case 'download': {
                let item = this.props.selectedItem;
                this.downloadFile(item._links.download.href, item.file.name);
                break;
            }
            case 'move': {
                let item = this.props.selectedItem;

                if (item.hasOwnProperty('folder')) {
                    if (this.state.nameValue === 'root') {
                        axios.patch(item._links.self.href + '/move/root', {}).then((r) => {
                            this.sendPopupAction('success')
                        }).catch((e) => {
                            this.sendPopupAction('error')
                        });
                    } else {
                        axios.patch(item._links.self.href + '/move/' + this.state.nameValue, {}).then((r) => {
                            this.sendPopupAction('success')
                        }).catch((e) => {
                            this.sendPopupAction('error')
                        });
                    }
                } else if (item.hasOwnProperty('file')) {
                    let fileId = null;

                    axios.get(item._links.self.href, {}).then((r) => {
                        fileId = r.data.file.id;
                        if (this.state.nameValue === 'root') {
                            axios.patch(api + 'root/files/' + fileId + '/move', { folderId: null }, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then((r) => {
                                this.sendPopupAction('success')
                            }).catch((e) => {
                                this.sendPopupAction('error')
                            });
                        } else {
                            axios.patch(api + this.props.parent.folder.id + '/files/' + fileId + '/move', { folderId: this.state.nameValue }, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then((r) => {
                                this.sendPopupAction('success')
                            }).catch((e) => {
                                this.sendPopupAction('error')
                            });
                        }
                    });
                }
                break;
            }
            case 'rename': {
                let item = this.props.selectedItem;
                axios.patch(item._links.self.href, { name: this.state.nameValue }).then((r) => {
                    this.sendPopupAction('success')
                }).catch((e) => {
                    this.sendPopupAction('error')
                });
                break;
            }
            case 'upload': {
                this.actionUpload();
                break;
            }

            case 'OK': {
                this.sendPopupAction('OK');
                break;
            }
            case 'cancel': {
                this.sendPopupAction('cancel');
                break;
            }
            default: {
            }
        }
    }
    render() {
        return <div>
            {this.renderPopup()}
        </div>
    }
}

export default innerModal;
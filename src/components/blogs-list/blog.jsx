import React, {Component} from 'react';
import {Button, Glyphicon, Modal, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import Moment from 'react-moment';


class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            modal: false,
            collapsed: true
        }
    }

    deleteBlog = (deleteObj) => {
        fetch('api/posts/' + deleteObj.id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
        this.props.update();
    }

    editBlog = (editObj) => {
        const saveData = {
            header: this.state.title,
            body: this.state.description,
            timestamp: new Date()
        }
        fetch('api/posts/' + editObj.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
        this.props.update();
        this.setState({modal: false});
    }

    closeModal() {
        this.setState({modal: false});
    }

    openEditModal = (editObj) => {
        this.setState({title: editObj.header, description: editObj.body, modal: true});
    }
    formUpdateTextArea = (evt) => {
        this.setState({description: evt.target.value});
    }

    formUpdateInput = (evt) => {
        this.setState({title: evt.target.value})
    }

    render() {
        const body = this.props.blog.body;
        const truncatedText = body.length > 80 ? body.substring(0, 80) + '...' : body;
        return (
            <React.Fragment>
                <div className={'blog col-md-12 col-lg-12 col-sm-12 col-xs-12'}>
                    <div className={'title col-md-6 col-lg-6 col-sm-12 col-xs-12'}>{this.props.blog.header}</div>
                    <div className={'actions col-md-6 col-lg-6 col-sm-12 col-xs-12'}>
                        <span className={'edit-blog'} onClick={() => this.openEditModal(this.props.blog)}>
                            <Glyphicon glyph="edit"/>{'Edit'}
                            </span>
                        <span onClick={() => this.deleteBlog(this.props.blog)} className={'delete-blog'}>
                            <Glyphicon glyph="remove-circle"/>{'Remove Post'}
                            </span>
                    </div>
                    <div className={'date col-md-12 col-lg-12 col-sm-12 col-xs-12'}>
                        <small>
                            <Moment format="DD-MMM-YYYY">{this.props.blog.timestamp}</Moment>
                        </small>
                    </div>
                    <div className={'description col-md-12 col-lg-12 col-sm-12 col-xs-12'}>
                             <span hidden={!this.state.collapsed}>{truncatedText}
                                 <div hidden={truncatedText.length < 80} className={'read-more-button'}
                                      onClick={() => {this.setState({collapsed: !this.state.collapsed})}}>Read More
                                 </div>
                            </span>
                        <span hidden={this.state.collapsed} onClick={() => {this.setState({collapsed: !this.state.collapsed})}}>{this.props.blog.body}
                        </span>
                        <div hidden={this.state.collapsed && truncatedText !== ''} className={'read-more-button'}
                             onClick={() => {
                                 this.setState({collapsed: !this.state.collapsed})
                             }}>Read Less
                        </div>
                    </div>
                </div>
                <Modal show={this.state.modal}>
                    <Modal.Header>
                        <Modal.Title><span className={'edit-modal-title'}>Edit Your Thoughts</span></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="editTitleText">
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    value={this.state.title}
                                    onChange={this.formUpdateInput}
                                    type="text"
                                    placeholder="Enter Blog Title"
                                />
                            </FormGroup>

                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl onChange={this.formUpdateTextArea} value={this.state.description}
                                             componentClass="textarea" placeholder="Enter Blog Description"/>
                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className={'close-modal-button'} onClick={() => this.closeModal()}>Close</Button>
                        <Button className={"save-modal-button" + ((this.state.title ==='' && this.state.description ==='')? 'disabled-button' : '')} bsStyle="primary" onClick={() => this.editBlog(this.props.blog)}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Blog;
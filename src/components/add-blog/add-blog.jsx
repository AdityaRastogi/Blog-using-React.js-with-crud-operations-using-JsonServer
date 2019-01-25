import React, {Component} from 'react';
import { Button ,FormGroup , FormControl , ControlLabel , Modal} from 'react-bootstrap';

class AddBlog extends Component{
    constructor(props){
        super(props);
        this.state={
            add:false,
            textArea:'',
            titleControlValid:true,
            descriptionControlValid:true

        };
    }

    closeModal(){
        this.setState({add:false,titleControlValid:true,descriptionControlValid:true});
    }
    addBlog(){
        this.setState({add:true});
    }
    formUpdate = (evt)=>{
        this.setState({textArea: evt.target.value});
        this.validateForm();
    }
    validateForm(){
        if(this.inputTitle.value === ''){
            this.setState({titleControlValid:false});
        }
        else {
            this.setState({titleControlValid:true});
        }
        if(this.state.textArea === '') {
            this.setState({descriptionControlValid:false});
        }
        else {
            this.setState({descriptionControlValid:true});
        }
    }
    saveBlog=()=>{
        this.validateForm();
        if(this.inputTitle.value && this.state.textArea) {
            const saveData = {
                header: this.inputTitle.value,
                body: this.state.textArea,
                timestamp: new Date()
            }
            fetch('api/posts/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saveData)
            }).then(res => res.json())
            this.setState({add: false,textArea:''});
            this.props.getNewBlogs();
        }
    }
    render(){

        return(
            <React.Fragment>
                <Button disabled={this.state.add} bsStyle="primary" onClick={()=>this.addBlog()}><span className={'add-blog'}>Add Blog</span></Button>

                <Modal show={this.state.add}>
                    <Modal.Header>
                        <Modal.Title><span className={'modal-title'}>Your Thoughts</span></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form >
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    inputRef={(ref)=>{this.inputTitle = ref}}
                                    type="text"
                                    placeholder="Enter Blog Title"
                                />
                                <div hidden={this.state.titleControlValid} className={'field-error'}>{'Please provide blog title'}</div>
                            </FormGroup>

                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl onChange={this.formUpdate}  componentClass="textarea" placeholder="Enter Blog Description" />
                                <div hidden={this.state.descriptionControlValid} className={'field-error'}>{'Please provide blog description'}</div>
                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className={'close-modal'} onClick={()=>this.closeModal()}>Close</Button>
                        <Button bsStyle="primary" onClick={()=>this.saveBlog()}>Save changes</Button>
                    </Modal.Footer>
                </Modal>


            </React.Fragment>
        );
    }
}
export default AddBlog;
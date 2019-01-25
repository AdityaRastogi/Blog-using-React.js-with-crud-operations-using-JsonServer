import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Blog from './blog';

Enzyme.configure({adapter: new Adapter()});

describe('Blog component ',()=>{
    test('exists with props as blog ',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.exists()).toBe(true);
    });

    test('has wrapper div with blog as className',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.find('div.blog').length).toBe(1);
    });

    test('has wrapper div with className Blog which should have 4 children named as title,actions,date and description ',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.find('div.blog .title').length).toBe(1);
        expect(wrapper.find('div.blog .actions').length).toBe(1);
        expect(wrapper.find('div.blog .date').length).toBe(1);
        expect(wrapper.find('div.blog .description').length).toBe(1);
    });

    test('must have 2action buttons as Edit and Remove Post',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.find('div.blog .actions Glyphicon').length).toBe(2);
        expect(wrapper.find('div.blog .actions .edit-blog').text().includes('Edit')).toBe(true);
        expect(wrapper.find('div.blog .actions .delete-blog').text().includes('Remove Post')).toBe(true);
    });

    test('should have Modal with title as Edit Your Thoughts',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.find('Modal').length).toBe(1);
        expect(wrapper.find('Modal .edit-modal-title').text()).toBe('Edit Your Thoughts');
    });

    test('should have Modal with 2 FormGroups',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        expect(wrapper.find('Modal FormGroup').length).toBe(2);
    });

    test('should set modal state as true on click of Edit',()=>{
        const editObj={
            title:'Blog Title',
            description:'Blog Description',
        };

        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        wrapper.state().modal=false;
        wrapper.find('div.blog .actions .edit-blog').simulate('click',{
            state:{title: editObj.header, description: editObj.body, modal: true}
        });
        expect(wrapper.state().modal).toBe(true);
    });

    test('should update title state and description state on change of respective formControl',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        wrapper.state().title='Blog Title';
        wrapper.state().description='Blog Description';
        wrapper.find('FormControl').first().simulate('change',{
            target:{value:'Blog Title updated'}
        });
        wrapper.find('FormControl').last().simulate('change',{
            target:{value:'Blog Description updated'}
        });
        expect(wrapper.state().title).toBe('Blog Title updated');
        expect(wrapper.state().description).toBe('Blog Description updated');
    });

    test('should call closeModal method and set Modal State as false on click of Close modal button',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description'}}/>);
        wrapper.state().modal='true';
        const wrapperinstance= wrapper.instance();
        const closeModalFunctionSpy = jest.spyOn(wrapperinstance,'closeModal');
        wrapper.find('Modal .close-modal-button').simulate('click',{
            state:{modal:false}
        });
        expect(closeModalFunctionSpy).toHaveBeenCalled();
        expect(wrapper.state().modal).toBe(false);
    });

    test('should call EditBlog method on click of saveChanges modal button and close Modal with state as false',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description',id:5,header:'Blog Title'}} update={()=>{}}/>);
        const wrapperinstance= wrapper.instance();
        const editBlogFunctionSpy = jest.spyOn(wrapperinstance,'editBlog');

        wrapper.state().modal=true;
        wrapper.find('FormControl').first().simulate('change',{
            target:{value:'Blog Title updated'}
        });
        wrapper.find('FormControl').last().simulate('change',{
            target:{value:'Blog Description updated'}
        });
        wrapper.find('Modal .save-modal-button').simulate('click',{
            state:{modal:false}
        });
        expect(editBlogFunctionSpy).toHaveBeenCalled();

        expect(wrapper.state().modal).toBe(false);
    });

    test('should call DeleteBlog method on click of removePost button',()=>{
        const wrapper = shallow(<Blog blog={ {body:'Modal Description',id:5,header:'Blog Title'}} update={()=>{}}/>);
        const wrapperinstance= wrapper.instance();
        const deleteBlogFunctionSpy = jest.spyOn(wrapperinstance,'deleteBlog');
        wrapper.find('.actions .delete-blog').simulate('click');
        expect(deleteBlogFunctionSpy).toHaveBeenCalled();
    });
});
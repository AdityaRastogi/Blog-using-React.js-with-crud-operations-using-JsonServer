import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddBlog from './add-blog';

Enzyme.configure({adapter: new Adapter()});

describe('AddBlog component', () => {
    test('has 1 modal with title Your Thoughts', () => {
        const wrapper = shallow(<AddBlog/>);
        expect(wrapper.find('.modal-title').text()).toBe('Your Thoughts');
    });

    test('has 1 Button with Add Blog', () => {
        const wrapper = shallow(<AddBlog/>);
        expect(wrapper.find('Button .add-blog').text()).toBe('Add Blog');
    });

    test('has Form', () => {
        const wrapper = shallow(<AddBlog/>);
        expect(wrapper.find('Modal').find('form').length).toBe(1);
    });

    test('having form with 2 FormGroups', () => {
        const wrapper = shallow(<AddBlog/>);
        expect(wrapper.find('Modal form FormGroup').length).toBe(2);
    });

    test('having Modal footer with 2 Buttons', () => {
        const wrapper = shallow(<AddBlog/>);
        expect(wrapper.find('Modal Button').length).toBe(2);
    });

    test('calls addBlog function and update state', () => {
        const wrapper = shallow(<AddBlog/>);
        const addBlogSpy = jest.spyOn(AddBlog.prototype, 'addBlog');
        wrapper.find('Button').first().simulate('click',{
            state:{add:true}
        });
        expect(addBlogSpy).toHaveBeenCalled();
        expect(wrapper.state().add).toBe(true);
    });

    test('calls closeModal function and update state', () => {
        const wrapper = shallow(<AddBlog/>);
        const closeModalSpy = jest.spyOn(AddBlog.prototype, 'closeModal');
        wrapper.find('Button.close-modal').simulate('click',{
            state:{add:false}
        });
        expect(closeModalSpy).toHaveBeenCalled();
        expect(wrapper.state().add).toBe(false);
    });

    test('calls saveBlog function and update state', () => {
        const wrapper = shallow(<AddBlog getNewBlogs={()=>{}}/>);
        AddBlog.prototype.inputTitle ={
            value:'Blog Title'
        };
        wrapper.find('Button').last().simulate('click',{
            state:{add:false}
        });
        expect(wrapper.state().add).toBe(false);
    });
});


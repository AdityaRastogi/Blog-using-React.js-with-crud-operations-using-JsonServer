import React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import AddBlog from "./components/add-blog/add-blog";

Enzyme.configure({adapter:new Adapter()});

describe('AppComponent' , ()=>{
    test('Exists', () => {
        const wrapper = shallow(<App/>);
       expect(wrapper.exists()).toBe(true);
    });
    test('has PageHeader with text BLOG and as for your thoughts', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('PageHeader .page-title').text()).toBe('BLOG');
        expect(wrapper.find('PageHeader .sub-title').text()).toBe('for your thoughts');
    });
    test('has AddBlog component', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('AddBlog').length).toBe(1);
    });
    test('has SearchBox and onChange of searchBox value should set state with filtered list', () => {
        const wrapper = shallow(<App/>);
        const wrapperinstance= wrapper.instance();
        const expectedoutput=[{
            header: 'searched Blog 1234'
        }];

        wrapper.state().blogs = [{
            header: 'searched Blog 1234'
        },
            {
                header: 'search blog'
            }];
        wrapper.find('.search-box-input').simulate('change',{
            target:{value:'searched Blog'}
        });
        expect(wrapper.find('.search-box-input').length).toBe(1);
        expect(wrapper.state().filteredBlogs).toEqual(expectedoutput);
    });

    test('has Blogs Component', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('Blogs').length).toBe(1);
    });

    test('should call getNewBlogs method from componentDidMount', () => {
        const wrapper = shallow(<App/>);
        const wrapperinstance= wrapper.instance();
        const getNewBlogFunctionSpy = jest.spyOn(wrapperinstance,'getNewBlogs');
        wrapperinstance.componentDidMount();
        expect(getNewBlogFunctionSpy).toHaveBeenCalled();
    });
});

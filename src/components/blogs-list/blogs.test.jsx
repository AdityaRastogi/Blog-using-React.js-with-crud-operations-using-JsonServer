import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Blogs from './blogs';

Enzyme.configure({adapter: new Adapter()});

describe('Blogs component',()=> {
    test('exists', () => {
        const blogs=[];
        const wrapper = shallow(<Blogs blogs={blogs}/>);
        expect(wrapper.exists()).toBe(true);
    });

    test('should have wrapper div with class as blog-list', () => {
        const blogs=[];
        const wrapper = shallow(<Blogs blogs={blogs}/>);
        expect(wrapper.find('div.blog-list').length).toBe(1);
    });

    test('wrapper div should have 1 Blog', () => {
        const blogs=[ {
            "header": "1234567890",
            "body": "sdfgyjkhuiljk;ol';cfhgvjhbjnkml,rdytfcgjvkbhjkm;l,rtedfhctgjvkhbjkml",
            "timestamp": "2019-01-22T23:02:37.077Z",
            "id": 1
        }];
        const wrapper = shallow(<Blogs blogs={blogs}/>);
        expect(wrapper.find('div.blog-list Blog').length).toBe(1);
    });

    test('wrapper div should not have  Blog if blogs is []', () => {
        const blogs=[];
        const wrapper = shallow(<Blogs blogs={blogs}/>);
        expect(wrapper.find('div.blog-list Blog').length).toBe(0);
    });

    test('wrapper div should have 2 Blog if blogs has 2 posts', () => {
        const blogs=[
            {
                "header": "1234567890",
                "body": "sdfgyjkhuiljk;ol';cfhgvjhbjnkml,rdytfcgjvkbhjkm;l,rtedfhctgjvkhbjkml",
                "timestamp": "2019-01-22T23:02:37.077Z",
                "id": 1
            },
            {
                "header": ",ikymujtnhgb123213",
                "body": "ertyui768uyjgh87yuhj908ouie98uwirhjkfnds89ueiowjknds",
                "timestamp": "2019-01-23T09:21:40.950Z",
                "id": 2
            }
        ];
        const wrapper = shallow(<Blogs blogs={blogs}/>);

        expect(wrapper.find('div.blog-list Blog').length).toBe(2);
    });
});
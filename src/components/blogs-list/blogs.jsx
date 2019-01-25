import React, {Component} from 'react';
import Blog from "./blog";

class Blogs extends Component{
    constructor(props){
        super(props);
    }
    update=()=>{
        this.props.getNewBlogs();
    }
    render(){
        return(
            <div className={'blog-list'}>
                    {this.props.blogs.map(blog => <Blog update={this.update} key={blog.id} blog={blog}> </Blog>)}
                    </div>
        );
    }
}
export default Blogs;
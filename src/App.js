import React, { Component } from 'react';
import AddBlog from "./components/add-blog/add-blog";
import Blogs from "./components/blogs-list/blogs";
import {PageHeader} from "react-bootstrap";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs:[],
            filteredBlogs:[],
            inputValue:'',
            filter:false
        };
    }
    getNewBlogs=()=>{
        fetch('api/posts/')
            .then(response => response.json())
            .then(posts => {
                posts.sort(function(a,b){
                    var c = new Date(a.timestamp);
                    var d = new Date(b.timestamp);
                    return d-c;
                });
                this.setState({blogs:posts , filteredBlogs:posts});
            })
            .catch(err => console.error(err));
    }
  componentDidMount=()=> {
       this.getNewBlogs();
  }

  searchBlog =(evt) =>{
      let filteredLists= this.state.blogs;
        if(evt.target.value !== ''){
            filteredLists = filteredLists.filter((post) => post.header.toLowerCase().includes(evt.target.value.toLowerCase()));
            }
            this.setState({filteredBlogs:filteredLists});
  }
  render() {

    return (
        <React.Fragment>
            <PageHeader className={'blog-page-title'}>
                <span className={'page-title'}>BLOG</span><small><span className={'sub-title'}>for your thoughts</span></small>
            </PageHeader>

            <AddBlog getNewBlogs={this.getNewBlogs}/>

            <PageHeader>
                All Blogs <small><small>Total Blogs:{this.state.filteredBlogs.length}</small> </small>
                <small><span className="search-box">
                    <input className={'search-box-input'} onChange={this.searchBlog} placeholder={'Search your blog'}></input>
                </span></small>
            </PageHeader>

            <Blogs getNewBlogs={this.getNewBlogs}
                blogs = {this.state.filteredBlogs}>
            </Blogs>
        </React.Fragment>
    );
  }
}

export default App;

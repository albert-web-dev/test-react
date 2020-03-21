import React, {Component} from 'react';
//import axios from 'axios';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component{
    /*state = {
        articles: {},
        status: 'Error'
    };*/

    render(){
        /*axios.get('http://localhost:3900/api/consultar/')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'Succes'
                });
            });*/
        
        return(
            <div id="blog">
                <div>
                    <Slider
                        title = "Blog"
                        size = "slider-small"
                    />
                </div>
                <div className="center">
                    <div className="content">
                        {/*Articulos que vienen del API rest */}

                        <Articles/>

                        {/*this.state.status === 'Succes' &&
                            <div>{
                                this.state.articles.map((article, i)=>{
                                    return (<div key={i}>
                                        <h3>{article.title}</h3>
                                        <p>{article.content}</p>
                                        <img src={article.image}/>
                                    </div>);
                                })
                            }</div>
                        */}
                    </div>
                    <Sidebar
                        aux = "true"
                    />
                </div>
            </div>
        );
    }
}

export default Blog;
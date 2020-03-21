import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';

class Articles extends Component{
    url = Global.url;
    state = {
        articles: [],
        status: null
    };

    componentWillMount(){
        var search = this.props.search;
        
        if(search && search !== null && search !== undefined){
            this.getArticleSearch(search);
        }else{
            this.getArticles();
        }
    }

    //buscar todos los articulos
    getArticles(){
        axios.get(this.url+'consultar/')
            .then(res =>{
                this.setState({
                    articles: res.data.articles,
                    status: "Succes"
                });
            });
    };

    //buscar un articulo tomand como parametro por la url
    getArticleSearch = (searched) =>{
        axios.get(this.url+'/search/'+searched)
            .then(res =>{
                this.setState({
                    articles: res.data.articles,
                    status: "Succes"
                });
            }).catch(err => {
                this.setState({
                    articles: [],
                    status: "Succes"
                });
            });
    };

    render(){
        /*Mostrar todos los articulos*/
        if(this.state.articles.length >= 1){
            var articlesList = this.state.articles.map((article, i) =>{
                return(
                    <article key={i} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image != null? (
                                <img src={this.url+'get-image/'+article.image} alt={article.title} />
                                ) : (
                                    <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                )
                            }
                        </div>
    
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/'+article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            });
            return(
                <div id="articles">
                    {articlesList}
                </div>
            );
            /*return(
                <div>
                    {this.state.status === 'Succes' &&
                        this.state.articles.map((article, i) =>{
                            return(
                                <div key={i}>
                                    <h3>{article.title}</h3>
                                    <p>{article.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            );*/
        }else if(this.state.articles.length >= 0 && this.state.status === 'Succes'){
            return(
                <h2>No hay articulos para mostrar.</h2>
            );
        }else{
            return(
                <h1 className="subheader">Cargando...</h1>
            );
        }
        
    }
}

export default Articles;
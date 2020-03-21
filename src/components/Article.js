import React, {Component} from 'react';
import swal from 'sweetalert';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from '../components/Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';

class Article extends Component{
    url = Global.url;
    
    state = {
        article: {},
        status: null
    };

    componentWillMount(){
        this.getArticle();
    };

    getArticle = () =>{
        var id = this.props.match.params.id; 
        
        axios.get(this.url+"consulta/"+id)
            .then(res =>{
                this.setState({
                    article: res.data.article,
                    status: "Succes"
                });
            });
    }

    deleteArticle = (id) =>{
        swal({
            title: "¿Estas seguro?",
            text: "No se podrá recuperar el articulo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url+"delete/"+id)
                    .then( res =>{
                        this.setState({
                            article: res.data.article,
                            status: "Deleted"
                        });
                    });
                swal("El articulo ha sido eliminado!", {
                    icon: "success",
                });
            } else {
                swal("OK. El articulo sigue a salvo!");
            }
        });
        /*axios.delete(this.url+"delete/"+id)
            .then( res =>{
                this.setState({
                    article: res.data.article,
                    status: "Deleted"
                });
            });*/
    }
    render(){
        if(this.state.status === 'Deleted'){
            return(
                <Redirect to='/blog' />
            );
        }
        var article = this.state.article;
        return(
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image != null? (
                                    <img src={this.url+'get-image/'+article.image} alt={article.title} />
                                    ) : (
                                        <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                    )
                                }
                            </div>
        
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p> 
                                {article.content} 
                            </p>

                            <Link to={"/blog/editar/"+article._id}
                            className="btn btn-danger">Editar</Link>
                            
                            <button onClick={
                                ()=> {
                                    this.deleteArticle(article._id)
                                }
                            } className="btn btn-warning">Eliminar</button>

                            <div className="clearfix"></div>
                        </article>
                    }
                    <Sidebar/>
                </section>
            </div>
        );
    }
}

export default Article;
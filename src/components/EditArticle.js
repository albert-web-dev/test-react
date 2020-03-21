import React, {Component} from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';

//1.- tenemos que recoger de la url el id articulo a editar
//2.- crear un metodo para sacar ese objeto del backend
// 3.- repoblar/rellenar el formulario con esos datos
// 4.- actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component{
    titleRef = React.createRef();
    contentRef = React.createRef();
    url = Global.url;
    idArticle = null;

    state = {
        article: {},
        status: null,
        selectedFiles: null
    };

    componentWillMount(){
        this.idArticle = this.props.match.params.id;
        this.getArticle(this.idArticle);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es Obligatorio'
            }
        });
    }

    getArticle = (id) =>{
        axios.get(this.url+'consulta/'+id)
            .then(res =>{
                this.setState({
                    article: res.data.article
                });
            });
    }
    changeState = () =>{
        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });
        this.validator.showMessages();
        this.forceUpdate();
    }

    fileChange = (event) =>{
        this.setState({
            selectedFiles: event.target.files[0]
        });
    }

    saveArticle = (e) =>{
        e.preventDefault();
        //rellenar state con datos del formulario
        this.changeState();

        //revisar las validaciones
        if(this.validator.allValid()){
            //hacer una petición http por post para guardar el articulo
            axios.put(this.url+'update/'+this.idArticle, this.state.article)
            .then(res =>{
                
                if(res.data.status === 'Succes'){
                    
                    this.setState({
                        article: res.data,
                        status: 'Waiting'
                    });

                    swal(
                        'Articulo actualizado',
                        'El articulo ha sido actualizado correctamente',
                        'Success',{
                        icon: "success"}
                    )

                    //subir la imagen
                    if(this.state.selectedFiles !== null){
                        //sacar el id de el articulo
                        var articleId = this.state.article.articleUpdated._id;
                        
                        //crear un form data y añadir el fichero
                        const formData = new FormData();
                        
                        formData.append(
                            'file0',
                            this.state.selectedFiles,
                            this.state.selectedFiles.name
                        );

                        //peticion ajax
                        axios.post(this.url+'upload-image/'+articleId, formData)
                            .then(res =>{
                                if(res.data){
                                    this.setState({
                                        article: res.data.article,
                                        status: 'Success'
                                    });
                                    
                                }else{
                                    this.setState({
                                        article: res.data.article,
                                        status: 'Failed'
                                    });
                                }
                            });
                    }else{
                        this.setState({
                            status: 'Success'
                        });
                    }
                }else{
                    this.setState({
                        status: 'Failed'
                    });
                }
            });
        }else{
            this.setState({
                status: 'Failed'
            });
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render(){
        if(this.state.status === 'Success'){
            return (
                <Redirect to={'/blog'} />
            );
        }
        return(
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>

                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input defaultValue={this.state.article.title} type="text" name="title" ref={this.titleRef} onChange={this.changeState}/>
                                {
                                    this.validator.message('title', this.state.article.title, 'required|alpha_num_space')
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea defaultValue={this.state.article.content} name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                                {
                                    this.validator.message('title', this.state.article.title, 'required')
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <div className="image-wrap">
                                    {this.state.article.image != null? (
                                        <img className="thumb" src={this.url+'get-image/'+this.state.article.image} alt={this.state.article.title} />
                                        ) : (
                                            <img className="thumb" src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                        )
                                    }
                                </div>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                </section>
                <Sidebar/>
            </div>
        );
    }
}

export default EditArticle;
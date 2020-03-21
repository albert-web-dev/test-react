import React, {Component} from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';

class CreateArticle extends Component{
    titleRef = React.createRef();
    contentRef = React.createRef();
    url = Global.url;

    state = {
        article: {},
        status: null,
        selectedFiles: null
    };

    componentWillMount(){
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es Obligatorio'
            }
        });
    }

    changeState = () =>{
        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url+'save', this.state.article)
            .then(res =>{
                if(res.data.article){
                    this.setState({
                        article: res.data.article,
                        status: 'Waiting'
                    });

                    swal(
                        'Articulo creado',
                        'El articulo ha sido creado correctamente',
                        'Success'
                    )

                    //subir la imagen
                    if(this.state.selectedFiles !== null){
                        //sacar el id de el articulo
                        var articleId = this.state.article._id;

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
                    <h1 className="subheader">Crear Articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}/>
                            {
                                this.validator.message('title', this.state.article.title, 'required|alpha_num_space')
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {
                                this.validator.message('title', this.state.article.title, 'required')
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar/>
            </div>
        );
    }
}

export default CreateArticle;
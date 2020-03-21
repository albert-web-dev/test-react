import React, {Component} from 'react';

import Sidebar from './Sidebar';

class Formulario extends Component{
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    gHombreRef = React.createRef();
    gMujerRef = React.createRef();
    gOtroRef = React.createRef();

    state = {
        user:{}
    };

    enviarFormulario = (e) => {
        var sexo;
        if(this.gHombreRef.current.checked){
            sexo = 'Hombre'
        }
        else if(this.gMujerRef.current.checked){
            sexo = 'Mujer'
        }else{
            sexo = 'Otro'
        }

        var user ={
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: sexo
        }

        this.setState({
            user: user
        });

        e.preventDefault();
        console.log("formulario enviado");
        console.log(user);
    }
    
    render(){
        
        return(
            <div id="formulario">
                {/*<div>
                    <Slider
                        title = "formulario"
                        size = "slider-small"
                    />
                </div>*/}
                
                <div className="center">
                    <div className="content">
                        <h1 className="subheader">Formulario</h1>
                        {/*Mostrar datos del Formulario */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: {this.state.user.nombre}</p> 
                                <p>Apellido: {this.state.user.apellidos}</p> 
                                <p>Bio: {this.state.user.bio}</p> 
                                <p>Género: {this.state.user.genero}</p> 
                            </div>
                        }
                        <form className="mid-form" onSubmit={this.enviarFormulario} onChange={this.enviarFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef} ></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.gHombreRef} /> Hombre 
                                <input type="radio" name="genero" value="mujer" ref={this.gMujerRef} /> Mujer 
                                <input type="radio" name="genero" value="otro" ref={this.gOtroRef} /> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                    <Sidebar
                        aux = "false"
                    />
                </div>
            </div>
        );
    }
}

export default Formulario;
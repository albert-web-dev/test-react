import React, {Component} from 'react';
import MiComponente from './MiComponente';


class SeccionPruebas extends Component{
    //Contador = 0;

    constructor(props){
        super(props);
        this.state = {
            contador: 0
        };
    }

    /*
     this.state = {
            contador: 0 <--- Aqui afuera sin declarar el contructor también funciona.
        };
    */
    
    HolaReact(nombre, edad){
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}, deseo ser programador Front-end</h2>
                <h3>Tengo {edad} años.</h3>
            </div>
       );
       return presentacion;
    }
    sumar = (e) => {
        this.setState({
            contador:(this.state.contador + 1)
        });
        //this.Contador ++;
    }
    restar = (e) => {
        this.setState({
            contador: (this.state.contador - 1)
        });
        //this.Contador --;
    }

    render(){
        let nombre = "Alberto";
        let edad = 29;
        
        return(
            <section id = "content">
                <h2 className="subheader">Funciones y JSX Básico</h2>
                {this.HolaReact(nombre, edad)}
                <h2 className="subheader">Componentes</h2>
                <section className="micomponente">
                    <MiComponente/>
                     <hr/>
                    
                </section>
                <h2 className="subheader">Estado</h2>
                <p>
                    Contado: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar}/> 
                    {/*si las funciones que llamas no son funciones flecha, despues de sumar se pone .bind(this)*/}
                    <input type="button" value="Restar" onClick={this.restar}/>
                </p>
            </section>
        );
    }
}

export default SeccionPruebas;
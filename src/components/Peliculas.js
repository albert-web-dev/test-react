import React, {Component} from 'react';
import Pelicula from './Pelicula';
import Sidebar from './Sidebar';
import Slider from './Slider';

class Peliculas extends Component{
    state = {
        
    }
    favorita = (pelicula, indice) => {
        console.log(indice);
        console.log(pelicula);
        this.setState({
            favorita: pelicula
        });
    }

    //metodos del ciclo de vida de un componente
    //cuando se va a montar(cargar el componente)
    componentWillMount(){
        this.setState({
            peliculas: [{titulo: 'Diez cosas que odio de ti', image: 'https://www.rockandpop.cl/wp-content/uploads/2018/07/168948-400x360.jpg'},
                    {titulo: 'El Lobo de Wall Street', image: 'https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2014/04/13/155684.jpg'},
                    {titulo: 'Scream', image: 'https://2.bp.blogspot.com/-Q_plLUbmXvA/WAvlQzSbMsI/AAAAAAAAJ-0/sGpMgYhLUeoPSL8exTGVMtPhIzTSPWFiACLcB/s1600/Scream_poster_usa.jpg'}
                    ],
        favorita: {},
        nombre: 'Alberto'
        });
    }

    //cuando ya fue cargado el componente
    componentDidMount(){
        //alert("El Componente fue montado");
    }

    //cuando el componente fue cerrado
    componentWillUnmount(){

    }

    render(){
        //condiconales (IF)
        var favorita;
        if(this.state.favorita.titulo){
            favorita = <p className="favorita">
                            La película favorita es: <strong><span>{this.state.favorita.titulo}</span></strong>
                        </p>
        }else{
            favorita = <p className="favorita">No hay Película favorita.</p>
        }

        return(
            <React.Fragment>
                <Slider
                    title = "Películas"
                    size = "slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2>Listado de Películas.</h2>
                        <p>Sección de películas que le gustan ha: {this.state.nombre}</p>
                        
                        {/* ESTA ES UNA FORMA PARA HACER CONDIFIONES IF
                            {this.state.favorita.titulo &&
                                <p className="favorita">
                                    La película favorita es: <strong><span>{this.state.favorita.titulo}</span></strong>
                                </p>
                            }   
                        PARA USAR UN ELSE ---
                            {this.state.favorita.titulo(
                                <p className="favorita">
                                    La película favorita es: <strong><span>{this.state.favorita.titulo}</span></strong>
                                </p>
                            ) : (
                                <p className="favorita">
                                    La película favorita es: <strong><span>{this.state.favorita.titulo}</span></strong>
                                </p>
                            )
                        }*/}
                        {favorita}

                        <div id="article" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return(
                                        <Pelicula 
                                            key={i}
                                            pelicula={pelicula}
                                            marcarFavorita={this.favorita}
                                            indice={i}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        aux = "false"
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default Peliculas;
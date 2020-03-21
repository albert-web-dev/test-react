import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

//importar componentes para usarlos en las rutas
import MiComponente from './components/MiComponente';
import SeccionPruebas from './components/SeccionPruebas';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Header from './components/Header';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

import Footer from './components/Footer';
import Home from './components/Home';



class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Header/>
                {/*CONFIGURAR RUTAS Y PÁGINAS */}
                    <Switch>
                        {/*Rutas utiles */}
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/blog" component={Blog}/>
                        <Route exact path="/blog/articulo/:id" component={Article} />
                        <Route exact path="/blog/crear" component={CreateArticle} />
                        <Route exact path="/blog/editar/:id" component={EditArticle} />
                        <Route exact path="/blog/busqueda/:search" component={Search} />
                        <Route exact path="/redirect/:search" render={
                            (props)=>{
                                var search = props.match.params.search;
                                return(
                                    <Redirect to={"/blog/busqueda/"+search} />
                                );
                            }
                        } />
                        <Route exact path="/formulario" component={Formulario}/>
                        <Route exact path="/peliculas" component={Peliculas}/>
                        
                        {/*rutas de ejemplo/prueba */}
                        <Route exact path="/segunda-ruta" component={SeccionPruebas}/>
                        {/*otra forma de hacer una ruta */}
                        <Route exact path="/ruta-de-prueba" render={()=>(
                            <React.Fragment>
                                <h1>Hola, desde la ruta alterna</h1>
                                <MiComponente saludo="Hola Mundo"/>
                            </React.Fragment>
                        )}/>

                        <Route exact path="/prueba/:nombre/:apellido?" render={(props)=>{
                            let nombre = props.match.params.nombre;
                            let apellido = props.match.params.apellido;
                            return (
                                <React.Fragment>
                                    {nombre && !apellido &&
                                        <h1>{nombre}</h1>
                                    }
                                    {nombre && apellido &&
                                        <h1>{nombre + ' ' + apellido}</h1>
                                        
                                    }
                                    
                                </React.Fragment>
                            );
                        }} />
                        <Route component={Error}/>
                    </Switch>
                    <div className="clearfix"></div>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default Router;
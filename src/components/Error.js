import React, {Component} from 'react';

class Error extends Component{
    render(){
        return(
            <section>
                <h2>Error al cargar la página.</h2>
                <p>La página que buscas no existe...</p>
            </section>
        );
    }
}

export default Error;
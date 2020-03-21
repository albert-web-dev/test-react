//importar a react para usar sus metodos
import React from 'react';

//definir una clase que debe llevar el mismo nombre del componente 
//y heréda de React trallendo el metodo component para definir que ésta clase es un componente
class MiComponente extends React.Component{
    //se crea el metodo render
    render(){
        let Receta = {
            nombre: 'Pizza',
            ingredientes: ['Queso','Harína', 'Peperoni', 'Champiñon', 'Tomate'],
            calorias: 400
        };
        
        //el render lleva un return
        return(
            //<reactFragment> ésta etiqueta es una opcion alterna a un div o cualquier contenedor HTML
            <div>
                {/*recibir propiedades por props*/}
                {this.props.saludo &&
                    <h2>{this.props.saludo}</h2>
                }
                <h2>{'Receta de una ' + Receta.nombre}</h2>
                <h2>{'Calorías ' + Receta.calorias}</h2>
                <ol>
                    {Receta.ingredientes.map((ingrediente, i) => {
                        return(
                            <li key={i}>
                                {ingrediente}
                            </li>
                        );
                    })}
                </ol>
            </div>
            //</reactFragment>
        );
    }
}

export default MiComponente;

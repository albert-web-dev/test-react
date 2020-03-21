import React, {Component} from 'react';
//import axios from 'axios';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component{
    render(){
        var searched = this.props.match.params.search;
        return(
            <div id="search">
                <div>
                    <Slider
                        title = {"Busqueda: "+searched}
                        size = "slider-small"
                    />
                </div>
                <div className="center">
                    <div className="content">
                        {/*Articulos que vienen del API rest */}

                        <Articles
                            search={searched}
                        />

                    </div>
                    <Sidebar
                        aux = "true"
                    />
                </div>
            </div>
        );
    }
}

export default Search;
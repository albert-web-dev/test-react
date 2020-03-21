import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Home extends Component{
    render(){
        //props
        var buttonString = "Ver más";
        return(
            <div id="home">
                <div>
                    <Slider
                        title = "Aprendiendo React"
                        size = "slider-big"
                        btn = {buttonString}
                    />
                </div>
                
                <div className="center">
                    <div className="content">
                        <h1>Ultimos articulos</h1>
                        
                    </div>
                    
                    <Sidebar/>
                </div>
            </div>
        );
    }
}

export default Home;
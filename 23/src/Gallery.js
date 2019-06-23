import React from 'react';
import './Gallery.css'
import logo from './logo.svg';

const Gallery = () => {
    return (
        <div className="col-100">
            <div className="col-50">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="col-50">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="col-50">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="col-50">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        </div>
    );
}

export default Gallery;
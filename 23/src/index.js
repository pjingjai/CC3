import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './Hello';
import HelloClass from './HelloClass';
import Gallery from './Gallery';
import * as serviceWorker from './serviceWorker';
// const Hello = () => {
//     return <div>Hello World</div>
// }
// class HelloClass extends React.Component {
//     render () {
//         return <div>Hello React!</div>
//     }
// }
ReactDOM.render(<div><Hello /><HelloClass /><Gallery /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

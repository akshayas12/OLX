import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './store/firbaseContext'
import Context from './store/firbaseContext'
import firebase from './Firebase/config';
ReactDOM.render(
<FirebaseContext.Provider value={{firebase}}>
    <Context>
    <App />
    </Context> 
    </FirebaseContext.Provider>

,document.getElementById('root'));

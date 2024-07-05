import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {AuthContext, FirebaseContext} from './store/firbaseContext'
import Home from './Pages/Home';
import Create from './Pages/Create';
import Viewpost from './Pages/ViewPost'
import {Post} from './store/PostContext';
function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user=>{  //firebase.auth().onAuthStateChanged tjis is used to check the user will be lohin or not 
      setUser(user)
    }))

  });
  return (
    <div>
  <Post>
      <Router>
        <Route exact path='/'>   
          <Home />
        </Route>
        <Route path='/signup'>   
          <Signup />
        </Route>
        <Route path='/login'>   
          <Login />
        </Route>
        <Route path='/create'>   
          <Create />
        </Route>
        <Route path='/view'>   
          <Viewpost />
        </Route>
      </Router>
   </Post>
    </div>
  );
}

export default App;

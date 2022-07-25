import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login';
import Feed from './components/Feed';
import {useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import {AuthProvider, AuthContext} from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';


function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <AuthProvider>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            
            <PrivateRoute path="/profile/:id" component={Profile}/>
            <PrivateRoute path="/" component={Feed}/>
      </Switch>
      </AuthProvider>
     
    </Router>
    

  );
}

export default App;

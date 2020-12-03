import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// components
import Navbar from './components/Navbar';

//pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

// front end 4:44:44;

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

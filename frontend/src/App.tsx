import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App

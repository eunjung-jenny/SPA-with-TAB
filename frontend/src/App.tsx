import 'antd/dist/antd.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Header />
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

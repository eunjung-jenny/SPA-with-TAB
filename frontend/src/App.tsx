import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import UserContext, { initialUserContextValue } from './contexts/user-context'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App(): JSX.Element {
  return (
    <UserContext.Provider value={initialUserContextValue}>
      <div className="App">
        <Router>
          <UserContext.Consumer>
            {(context) => (
              <>
                <Header {...context} />
                {context.user.authorized ? <Home /> : <Auth />}
              </>
            )}
          </UserContext.Consumer>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App

import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import UserContext, {
  initialUserContextValue,
  LoginType,
  UserType,
} from './contexts/user-context'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { loginCompleted } from './utils/auth'

function App(): JSX.Element {
  const [user, setUser] = React.useState<UserType>(initialUserContextValue.user)

  const login = (type: LoginType) => () => {
    if (type === LoginType.INSIDER) {
      setUser({ authorized: true, isInside: true })
    }
    if (type === LoginType.OUTSIDER_WO_TF) {
      setUser({ authorized: true, isInside: false, passTwoFactor: false })
    }
    if (type === LoginType.OUTSIDER_W_TF) {
      setUser({ authorized: true, isInside: false, passTwoFactor: true })
    }
  }

  const logout = () => {
    setUser({ authorized: false })
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <div className="App">
        <Router>
          <UserContext.Consumer>
            {(context) => (
              <>
                <Header {...context} />
                {loginCompleted(context.user) ? <Home /> : <Auth />}
              </>
            )}
          </UserContext.Consumer>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App

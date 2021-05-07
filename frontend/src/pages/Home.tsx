import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Main from '../components/layout/Main'
import Nav from '../components/layout/Nav'
import TabContext from '../contexts/tab-context'
import { AuthorizedUserType } from '../contexts/user-context'

const Container = styled.div`
  &.home {
    display: flex;
    min-height: 100vh;
  }
`

type Props = {
  user: AuthorizedUserType
}

const Home: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  const { user } = props

  React.useEffect(() => {
    history.push('/')
  }, [])

  return (
    <TabContext.Consumer>
      {(context) => (
        <Container className="home">
          <Nav
            user={user}
            navStyle={{ maxWidth: '250px' }}
            menuStyle={{ minHeight: '100vh' }}
          />
          <Main tabContext={context} style={{ width: '100%' }}>
            화면
          </Main>
        </Container>
      )}
    </TabContext.Consumer>
  )
}

export default Home

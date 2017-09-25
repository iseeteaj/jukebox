import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import NowPlaying from './components/NowPlaying'
import Login from './components/Login'
import Playlist from './components/Playlist'

import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      gAuthInstance: null,
      authenticatedUser: null
    }

    this.handleAuthorization = this.handleAuthorization.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        'apiKey': process.env.REACT_APP_GOOGLE_API_KEY,
        'clientId': process.env.REACT_APP_GOOGLE_CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
      }).then(() => {
        this.setState({
          gAuthInstance: window.gapi.auth2.getAuthInstance()
        })

        this.state.gAuthInstance.isSignedIn.listen(this.handleAuthorization)
        this.handleAuthorization()
      }).catch(error => console.log(error))
    })
  }

  handleAuthorization () {
    this.setState({
      authenticatedUser: this.state.gAuthInstance.currentUser.get()
    })
  }

  handleSignOut () {
    this.state.gAuthInstance.signOut()

    this.setState({
      authenticatedUser: null
    })
  }

  render () {
    if (this.state.authenticatedUser) {
      return (
        <div className='App'>
          <Header onSignOut={this.handleSignOut} />
          <div className='split'>
            <Sidebar />
            <Main>
              <Route path='/playlists/:playlistId' component={Playlist} />
            </Main>
          </div>
          <NowPlaying />
        </div>
      )
    }

    return (
      <div className='App'>
        <Login gAuthInstance={this.state.gAuthInstance} />
      </div>
    )
  }
}

export default App

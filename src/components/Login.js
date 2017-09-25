import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  constructor () {
    super()

    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleSignIn () {
    this.props.gAuthInstance.signIn()
  }

  render () {
    if (this.props.gAuthInstance) {
      return (
        <div className='Login'>
          <div className='inner'>
            <h1>Jukebox</h1>
            <button className='youtube-button' onClick={this.handleSignIn}><i className='fa fa-youtube-play' aria-hidden='true'></i> Sign in to YouTube</button>
          </div>
        </div>
      )
    }

    return (
      <div className='Login'>
        <div className='inner'>
          Loading...
        </div>
      </div>
    )
  }
}

export default Login

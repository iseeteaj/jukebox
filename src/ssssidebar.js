import React, { Component } from 'react'
import Playlists from './Playlists'
import './Sidebar.css'

class Sidebar extends Component {

}

export default Sidebar

constructor () {
  super()

  this.state = {
    playlists: []
  }
  componentDidMount () {
    constyoutube=window.gapi.client.youtube
}
}

render () {
  return (
    <div className="Sidebar">
      <Playlists playlists={this.state.playlists} />
    </div>
  )
}


Inside, assign window.gapi.client.youtube to a constant youtube (our YouTube models/schemas are available on gapi.client because we specified youtube in our scopes earlier):

componentDidMount () {
  const youtube = window.gapi.client.youtube
}

Now we call .channels on gapi.client.youtube to get back methods that we can use to perform CRUD actions on channels, and we call the .list method (to get a list of channels that match the given criteria). In this case, the given criteria is channels owned by the logged in user (mine) and return the id field:

youtube.channels.list({
  part: 'id',
  mine: true
})

Again, this returns a Promise, so we need chain .then and .catch to deal with the response/error:

youtube.channels.list({
  part: 'id',
  mine: true
}).then(() => {

}).catch(error => console.log(error))

Inside the .then, we see if we received a channel ID back from our request and if so then we assign it to constant channelId:

youtube.channels.list({
  part: 'id',
  mine: true
}).then(response => {
  const result = response.result

  if (!result.items || !result.items.length) {
    return
  }

  const channelId = result.items[0].id
}).catch(error => console.log(error))

Finally, whilst still inside the .then resolve, we make another request to gapi.client.playlists, passing in the channelId. We set our state.playlists to the result:

const youtube = window.gapi.client.youtube

youtube.channels.list({
  part: 'id',
  mine: true
}).then(response => {
  const result = response.result

  if (!result.items || !result.items.length) {
    return
  }

  const channelId = result.items[0].id

  window.gapi.client.youtube.playlists.list({
    channelId,
    maxResults: 25,
    part: 'snippet,contentDetails'
  }).then(response => {
    this.setState({
      playlists: response.result.items
    })
  }).catch(error => console.log(error))
}).catch(error => console.log(error))

:bulb:

Please, please, please don't be afraid to console.log everywhere to see what these different objects look like. If you explore the various objects inside Chrome's Developer Tools then it will make the code easier to understand, and you will build the confidence to make modifications and work with other API features.

Now add Sidebar to App.js in the authenticatedUser if block (also add the surrounding div.split:

render () {
  if (this.state.authenticatedUser) {
    return (
      <div className="App">
        <Header onSignOut={this.handleSignOut} />
        <div className="split">
          <Sidebar />
        </div>
      </div>
    )
  }

  ...
}
import React, {Component} from 'react'
import Playlists from './Playlists'
import './Sidebar.css'

class Sidebar extends Component {
  constructor () {
    super()

    this.state = {
      playlists: []
    }
  }
  componentDidMount () {
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
    }

  render () {
    return (
      <div className='Sidebar'>
        <Playlists playlists={this.state.playlists} />
      </div>
    )
  }
}


export default Sidebar

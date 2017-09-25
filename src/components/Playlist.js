import React, { Component } from 'react'
import PlaylistItem from './PlaylistItem'
import './Playlist.css'

class Playlist extends Component {
  constructor () {
    super()

    this.state = {
      playlistItems: []
    }

    this.getPlaylistItems = this.getPlaylistItems.bind(this)
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId

    this.getPlaylistItems(playlistId)
  }

  componentWillReceiveProps (nextProps) {
    const playlistId = nextProps.match.params.playlistId

    this.getPlaylistItems(playlistId)
  }

  getPlaylistItems (playlistId) {
    const youtube = window.gapi.client.youtube

    youtube.playlistItems.list({
      playlistId,
      part: 'snippet,contentDetails',
      maxResults: 50
    }).then(response => {
      const result = response.result

      if (!result.items || !result.items.length) {
        return
      }

      this.setState({
        playlistItems: result.items
      })
    }).catch(error => console.log(error))
  }

  render () {
    const playlistItems = this.state.playlistItems.map(playlistItem => {
      return (
        <PlaylistItem key={playlistItem.id} title={playlistItem.snippet.title} videoId={playlistItem.contentDetails.videoId} />
      )
    })

    return (
      <div className='Playlist'>
        {playlistItems}
      </div>
    )
  }
}

export default Playlist

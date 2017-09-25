import React from 'react'
import { Link } from 'react-router-dom'
import './Playlists.css'

function Playlists (props) {
  const playlistLinks = props.playlists.map(function (playlist) {
    return (
      <Link key={playlist.id} to={`/playlists/${playlist.id}`} className='playlist'>
        {playlist.snippet.title}
      </Link>
    )
  })

  return (
    <div className='Playlists'>
      {playlistLinks}
    </div>
  )
}

export default Playlists

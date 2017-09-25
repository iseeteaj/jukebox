import React from 'react'
import './PlaylistItem.css'

function PlaylistItem (props) {
  return (
    <div className='PlaylistItem'>
      <div className='play'>
        <i className='fa fa-play' aria-hidden='true'></i>
      </div>
      <div className='title'>
        {props.title}
      </div>
    </div>
  )
}

export default PlaylistItem

import React from 'react'
import SearchInput from './SearchInput'
import './Header.css'

function Header (props) {
  return (
    <div className='Header'>
      <div className='logo'>
        <i className='fa fa-music' aria-hidden='true'></i>
        Jukebox
      </div>
      <div className='search'>
        <SearchInput />
      </div>
      <div className='logout'>
        <i className='fa fa-sign-out' aria-hidden='true' onClick={props.onSignOut}></i>
      </div>
    </div>
  )
}

export default Header

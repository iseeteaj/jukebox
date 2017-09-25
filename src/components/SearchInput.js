import React from 'react'
import './SearchInput.css'

function SearchInput (props) {
  return (
    <div className="SearchInput">
      <i className="fa fa-search" aria-hidden="true"></i>
      <input type="text" placeholder="Search" />
    </div>
  )
}

export default SearchInput

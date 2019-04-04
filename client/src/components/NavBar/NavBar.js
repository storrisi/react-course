import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">List</NavLink>
        <NavLink to="/add">Add</NavLink>
      </div>
    )
  }
}

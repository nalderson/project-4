import { Link, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const Navbar = ({ history }) => {

  return <nav>
    <Link to="/">
      <img src="logo.png" />
    </Link>
    <Link to="/explore">
      Explore
    </Link>
    <Link to="/login">
      Login
    </Link>
    <Link to="/profile/myprofile/:username">
      My Profile
    </Link>
  </nav>

}

export default withRouter(Navbar)
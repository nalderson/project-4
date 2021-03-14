import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from './lib/auth'


const Navbar = ({ history }) => {
  const [mobNav, updateMobNav] = useState(false)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/logout')
  }
  const loggedIn = getLoggedInUserId()

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-items" to={'/'}>
      <img src="../images/logo_transparent.png" width="50" height="50"/>
      </Link>
      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-start">


        <div className="navbar-item has-dropdown is-hoverable">

          <div className="navbar-dropdown">
            <hr className="navbar-divider" />
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="menu-item">
            {<Link to="/explore" className="button is-light is-rounded">Explore</Link>}
            {loggedIn && <Link to="/profile/myprofile/:username" className="button is-dark is-rounded">My Profile</Link>}
            {!loggedIn && <Link to="/login" className="button is-dark is-rounded">Login</Link>}
            {loggedIn && <button className="button is-light is-rounded" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  </nav >

}

export default withRouter(Navbar)
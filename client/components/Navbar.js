import { Link, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import { getLoggedInUserId } from '../lib/auth'
import axios from 'axios'
const Navbar = ({ history }) => {


  const [logIn, updateLogin] = useState(false)
  const [mobNav, updateMobNav] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [isMobile, updateIsMobile] = useState(false)
  
  useEffect(() => {
    function determineMobile(x) {
      if (x.matches) { // If media query matches
        updateIsMobile(true)
      } else {
        updateIsMobile(false)
      }
    }
    
    var x = window.matchMedia('(max-width: 500px)')
    determineMobile(x) // Call listener function at run time
    x.addListener(determineMobile) // Attach listener function on state changes
  }, [])
  
  
  
  useEffect(() => {
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        //change the button to logout
        updateLogin(true)
        setUserId(getLoggedInUserId())
      }
    }
    handleLogin()
  }, [])
  useEffect(() => {
    async function fetchUser() {
      try {
        console.log(userId)
        const { data } = await axios.get(`/api/profile/${userId}`)
        setUserName(data.username)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [userId])

  function logOut() {
    localStorage.removeItem('token')
    location.reload()
  }

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand" id="navbarImage">
      <Link to="/"><img src={logo} width="100" /></Link>
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
            <Link to="/explore" className="button is-light is-rounded">Explore</Link>
            <Link className="button is-light is-rounded" to={isMobile ? "/mobile-photo-upload" : "/photo-upload"}>New Photo</Link>
            {logIn && <Link to={`/profile/myprofile/${userName}`} className="button is-dark is-rounded">My Profile</Link>}
            {!logIn && <Link to="/login" className="button is-dark is-rounded">Login</Link>}
            {logIn && <button className="button is-light is-rounded" onClick={logOut}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  </nav >


}

export default withRouter(Navbar)
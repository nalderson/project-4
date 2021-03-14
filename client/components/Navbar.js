import { Link, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import { getLoggedInUserId } from '../lib/auth'
import axios from 'axios'
const Navbar = ({ history }) => {


  const [logIn, updateLogin] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

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
    </div>
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        {!logIn ?
          <div className="navbar-item">
            <Link className="button" to="/login">Login</Link>
          </div> :
          <div className="navbar-item">
            <Link className="button" to={`/profile/myprofile/${userName}`}>My Profile</Link>
            <Link className="button" to="photo-upload">New Photo</Link>
            <button className="button" onClick={logOut}>Log Out</button>
          </div>
        }
      </div>
    </div>
  </nav>


}

export default withRouter(Navbar)
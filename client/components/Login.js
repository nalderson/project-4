import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login({ history }) {

  const [loginData, updateLoginData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateLoginData({ ...loginData, [name]: value })
  }


  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', loginData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return <section className="hero is-danger is-fullheight">
    <div className="hero-body" id="herobackground">
      <div className="container">
        <main className='column'>
          <div className='column is-flex is-flex-direction-column is-align-items-center'>
            <h1 className='titles'>Login</h1>
            <form className='field' onSubmit={handleSubmit}>
              <div>
                <label className='labels'>Email</label>
                <div className='control'>
                  <input className='input'
                    type="text"
                    value={loginData.email}
                    onChange={handleChange}
                    name={'email'}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='labels'>Password</label>
                <div className='control'>
                  <input className='input'
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    name={'password'}
                  />
                </div>
              </div>
              <div className="control">
                <button className="button is-rounded">Login</button>
              </div>
            </form>
            <div className='block box'>
              <h5>Don't have an account? <Link to='/register'>Sign up!</Link></h5>
            </div>
          </div>
        </main>


      </div>
    </div>
  </section>
}
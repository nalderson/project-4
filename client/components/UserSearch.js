import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserSearch() {
  const [users, updateUsers] = useState([])
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios.get('/api/users')
        updateUsers(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])
  async function handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    setFilterTerm(value)

  }

  function filterUsers() {
    return users.filter((user) => {
      return user.username.toLowerCase().includes(filterTerm.toLowerCase())
    })
  }

  return <section className='section is-centered'>
    <div className="has-text-centered" id="input-wrap">
      <div className="input-search">
        <input
          type="text"
          placeholder="Search by name..."
          className="input is-info is-rounded is-9 is-center" id="input-search"
          onChange={(event) => handleChange(event)}
          value={filterTerm}
        />
      </div>
    </div>
    {/* <div className="container is-centered">
      <div className="columns is-multiline is-mobile is-centered">
        {filterUsers().map((user, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
            <Link to={`/profile/${user.id}`}>
              <div className="card is-4x3">
                <div className="card-image ">
                  <figure className="image is-4by3">
                    <img src={user.profile_picture} alt={user.username} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="subtitle">{user.username}</p>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div> */}
    <section className="container is-centered" id="photos">
      {filterUsers().map((user, index) => {
        return <div key={index} id="userDiv">
          <Link to={`/profile/${user.id}`}>
            <img id="userImg" src={user.profile_picture} alt={user.username} />
          </Link>
          <p id="userName" className="title">{user.username}</p>
        </div>
      })}
    </section>
  </section>
}
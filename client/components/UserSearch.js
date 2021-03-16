import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserSearch() {
  const [users, updateUsers] = useState([])

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

  return <section className='section is-centered'>
    <div className="container is-centered">
      <div className="columns is-multiline is-mobile is-centered">
        {users.map((user, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
            <Link to={`/profile/${user.id}`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
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
    </div>
  </section>


}
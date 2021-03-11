import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Explore() {

  const [profile, updateProfile] = useState([])

  // Need to be logged in, in order to see Profile Page - so need to include the 
  // Bearer Token Auth here 

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await axios.get('/api/profile')
        updateProfile(data)

      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  return <section>
    {profile.map((user, index) => {
      return <div key={index}>
        <img src={user.photo} />
        <h1>{user.username}</h1>
        <h2>My Photos</h2>
        <div> 
          {user.photos.map((photo, index ) => {

          })}
        </div>
        <div>
          <button>Saved Photos</button>
          <button>Followers</button>
        </div>

      </div>
    })}

  </section>

}

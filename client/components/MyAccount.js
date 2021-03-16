import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DisplayFollowing from './DisplayFollowing'

export default function Explore({ match }) {

  const [profile, updateProfile] = useState({
    photos: [],
    following_current_user: [{}]
  })

  const token = localStorage.getItem('token')

  const username = match.params.username

  useEffect(() => {
    async function getProfileData() {
      try {
        const { data } = await axios.get('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } })
        updateProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfileData()
  }, [])

  return <div className="container is-vcentered">
    <div className="container is-vcentered block box" id="account-header">
      <img id="account-profile-pic" src={profile.profile_picture} />
      <h1 id="account-title" className="title">{profile.username}</h1>

      <div className="container is-center">
        <DisplayFollowing />
      </div>
    </div>
    <div className="block box">
      <section className="section is-centered">
        <div className="container is-centered">
          <div className="columns is-multiline is-mobile is-centered">
            {profile.photos.map((photo, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
                <Link to={{ pathname: '/explore/:photo_id' }}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={photo.url} alt={photo.caption} />
                      </figure>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  </div>
}
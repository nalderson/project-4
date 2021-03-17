import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

export default function Explore({ match }) {

  const [following, updateFollowing] = useState(false)
  const [profile, updateProfile] = useState({
    photos: [],
  })
  const token = localStorage.getItem('token')
  const user_id = match.params.user_id
  const history = useHistory()
  if (getLoggedInUserId() === parseInt(user_id)) {
    history.push(`/profile/myprofile/${profile.username}`)
  }
  useEffect(() => {
    async function getProfileData() {
      try {
        const { data } = await axios.get(`/api/profile/${user_id}`)
        console.log(data)
        console.log(data.following_current_user)
        data.following_current_user.map((user) => {

          if (user.following_user.id === getLoggedInUserId()) {
            updateFollowing(true)
          }

        })
        updateProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfileData()
  }, [following])

  async function followUser() {
    try {
      if (!following) {
        await axios.post(`/api/profile/${user_id}`, {}, { headers: { 'Authorization': `Bearer ${token}` } })
        console.log(following, 'line 34')
        updateFollowing(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return <div className="container is-vcentered">
    <div className="container is-vcentered" id="account-header">
      <img id="account-profile-pic" src={profile.profile_picture} />
      <h1 id="account-title" className="title">{profile.username}</h1>
      <div className="container">
        {!following && <div className="button is-light is-rounded" onClick={followUser}>Follow</div>}
        {following && <div className="button is-light is-rounded" disabled>Following</div>}
      </div>
    </div>
    <div>
      <section className="section is-centered">
        <div className="container is-centered" id="photos">
          {profile.photos.map((photo, index) => {
            return <div key={index} >
              <Link to={`/explore/${photo.id}`}>
                <img src={photo.url} alt={photo.caption} />
              </Link>
            </div>
          })}
        </div>
      </section>
    </div>
  </div>
}
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function DisplayFollowing(props) {
  const [modal, showModal] = useState(false)
  const [modal2, showModal2] = useState(false)
  const [profile, updateProfile] = useState({
    photos: [],
    following_current_user: [{}]
  })
  const token = localStorage.getItem('token')
  console.log(props)

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


  return <>
    <div className="buttons has-addons is-center">
      <button id="followers-button" className="account-buttons button is-rounded" onClick={() => showModal2(!modal2)} disabled={!profile.following_users}>Followers</button>
      <button id="following-button" className="account-buttons button is-rounded" onClick={() => showModal(!modal)} disabled={!profile.following_current_user}>Following</button>
    </div>
    <div role="button" className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Following</p>
            <button className="delete" aria-label="close" onClick={() => showModal(!modal)} />
          </header>
          <section className="modal-card-body">
            <div className="container is-centered">
              {profile.following_current_user.map((follower, index) => {
                if (follower.following_user) {
                  return <article key={index} className="media columns">
                    <Link to={{ pathname: `/profile/${follower.following_user.id}` }}>
                      <figure className="media-left column">
                        <p className="image is-64x64">
                          <img src={follower.following_user.profile_picture} alt={follower.following_user.username} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p><br />
                            <strong>{follower.following_user.username}</strong>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                }
              })}
            </div>
          </section>
        </div>
      </div>
    </div>

    {/* -------------------------------MODAL2---------------------------------- */}

    <div role="button" className={`modal ${modal2 ? 'is-active' : ''}`}>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Followers</p>
            <button className="delete" aria-label="close" onClick={() => showModal2(!modal2)} />
          </header>
          <section className="modal-card-body">
            <div className="container is-centered">
              {(profile.following_users) && profile.following_users.map((follower, index) => {
                return <article key={index} className="media">
                  <Link to={{ pathname: `/profile/${follower.following_current_user.id}` }}>
                    <figure className="media-left">
                      <p className="image is-64x64">
                        <img src={follower.following_current_user.profile_picture} alt={follower.following_current_user.username} />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content is-flex">
                        <p><br />
                          <strong>{follower.following_current_user.username}</strong>
                          </p>
                      </div>
                    </div>
                  </Link>
                </article>
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  </>
}

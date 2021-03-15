import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Select from 'react-select'
// import Creatable from 'react-select/creatable'

export default function DisplayFollowing(props) {
  const [modal, showModal] = useState(false)
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
      {/* <button className="account-buttons button is-dark is-rounded" onClick={() => showModal(!modal)}>Saved Photos</button> */}
      <button id="followers-button" className="account-buttons button is-dark is-rounded" onClick={() => showModal(!modal)}>Following</button>
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
                {/* <div className="columns is-multiline is-mobile is-centered"> */}
                <p>Hello World!</p>
                  {profile.following_current_user.map((follower, index) => {
                    console.log(profile.following_current_user)
                    if (follower.following_user) {
                      return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
                        <Link to={{ pathname: `/profile/${follower.following_user.username}` }}>
                          <img src={follower.following_user.profile_picture} alt={follower.following_user.username} />
                          <h4>{follower.username}</h4>
                        </Link>
                      </div>
                    }
                  })}
                </div>
              {/* </div> */}
            </section>

          </div>
        
      </div>
    </div>
  </>
}

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

  const [modalState, updateModalState] = useState(false)
  const [regData, updateRegData] = useState({
  })
  const [regErrors, updateRegErrors] = useState({
    username: '',
    profile_picture: ''
  })
  const [uploadSuccess, updateUploadSuccess] = useState(false)

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

  function openModal() {
    updateModalState(!modalState)
  }
  function handleChange(event) {
    const { name, value } = event.target

    updateRegData({ ...regData, [name]: value })
    updateRegErrors({ ...regErrors, [name]: '' })
  }
  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dqkixqgcu',
        uploadPreset: 'nasx6xsf',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateRegData({
          ...regData,
          profile_picture: result.info.secure_url
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  async function handleSave(event) {
    event.preventDefault()
    try {
      await axios.put(`/api/profile/${profile.id}`, regData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      openModal()
      location.reload()
    } catch (err) {
      console.log(err)
      updateRegErrors({ ...regErrors, username: 'This username has already been used, please pick another' })
    }
  }

  return <div className="container is-vcentered">
    <div className="has-text-right">
      <button className="button is-rounded" onClick={openModal}>Update Profile</button>
    </div>
    <div className="container is-vcentered block box" id="account-header">
      <img id="account-profile-pic" src={profile.profile_picture} />
      <h1 id="account-title" className="title">{profile.username}</h1>

      <div className="container is-center">
        <DisplayFollowing />
      </div>
    </div>
    <div>
      <section className="section is-centered">
        <div className="container is-centered">
          <div className="columns is-multiline is-mobile is-centered is-vcentered">
            {profile.photos.map((photo, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
                <Link to={{ pathname: `/explore/${photo.id}` }}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
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
    {modalState && <div className='modal is-active has-text-centered has-text-white'>
      <div className='modal-background'></div>
      <div className='modal-content is-clipped has-text-centered'>
        <p className='title has-text-white'>Update Profile</p><br></br>
        <div className='field'>
          <label className='labels'>Change Profile Picture</label>
          <div className='control'>
            <button className="button is-light is-rounded" onClick={handleUpload}>Upload a new profile picture</button>
            {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
          </div>
        </div>
        <div className='field'>
          <label className='labels'>Username</label>
          <div className='control'>
            <input className='input'
              type="text"
              value={regData.username}
              onChange={handleChange}
              name={'username'}
            />
            {regErrors.username && <small className="has-text-primary">{regErrors.username}</small>}
          </div>
        </div>
        <button className="button is-rounded" onClick={handleSave}>Save Changes</button>
      </div>
      <button className='modal-close is-large' aria-label="close" onClick={openModal}></button>
    </div>

    }
  </div>
}
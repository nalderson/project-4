import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function PhotoSave({ location }) {
  const weburl = location.state.url
  const [cloudinaryURL, updateCloudinaryURL] = useState('')
  const [photoData, updatePhotoData] = useState(
    {
      url: cloudinaryURL,
      caption: ''
    })
  const [captionError, updateCaptionError] = useState('')
  useEffect(() => {
    console.log('its happening')
    updatePhotoData({ ...photoData, url: weburl })
  }, [])
  const token = localStorage.getItem('token')
  const history = useHistory()
  function handleChange(event) {
    const { name, value } = event.target
    console.log('this is photo data', photoData)
    updatePhotoData({ ...photoData, [name]: value })
    updateCaptionError('')
  }

  async function handleSave(event) {
    event.preventDefault()
    if (!photoData.caption) {
      updateCaptionError('Please add a caption to your photo')
      return
    } else {
      try {
        console.log('here I am')
        console.log(photoData)
        await axios.post('/api/photos', photoData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        history.push('/explore')
      } catch (err) {
        console.log(err)
        console.log(err.response)
      }
    }
  }

  return <div className='modal is-active'>
    <div className='modal-background'></div>
    <div className='modal-content'>
      <div>
        <img src={photoData.url} />
        <form className='field' onSubmit={handleSave}>
          <div className='field'>
            <div className='control'>
              <input className='input'
                type='text'
                value={photoData.caption}
                onChange={handleChange}
                name={'caption'}
                placeholder='Please add a photo caption'
              />
              {captionError && <small className='has-text-primary'>{captionError}</small>}
              <br></br><small className='has-text-danger'>Hi there, we have a small bug here, if your space bar stops working, please refresh the page!</small>
            </div>
          </div>
          <div className="has-text-centered">
            <button className="button is-hovered is-rounded" onClick={handleSave}>Save Photo</button>
          </div>
        </form>
      </div>
    </div>

  </div>


}
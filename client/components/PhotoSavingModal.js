import React, { useState } from 'react'
import axios from 'axios'

export default function savePhoto(cloudinaryURL) {

  const [photoData, updatePhotoData] = useState(
    {
      url: cloudinaryURL,
      caption: ''
    }
  )
  const [captionError, updateCaptionError] = useState('')
  const token = localStorage.getItem('token')


  function handleChange(event) {
    const { name, value } = event.target
    updatePhotoData({ ...photoData, [name]: value })
    updateCaptionError('')
  }

  async function handleSave(event) {
    event.preventDefault()
    if (captionError === ''){
      updateCaptionError('Please add a caption to your photo')
      return
    }
    try {
      await axios.post('/api/photos', photoData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push('/explore')
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }

  return <div className='modal'>
    <div className='modal-background'>
      <div className='modal-content'>
        <div className='content'>
          <img src={cloudinaryURL} />
          <form className='field' onSubmit={handleSave}>
            <div className='field'>
              <label className='labels'>Please add a photo caption</label>
              <div className='control'>
                <input className='input'
                  type='text'
                  value={photoData.caption}
                  onChange={handleChange}
                  name={'caption'}
                />
                {captionError && <small className='has-text-primary'>{captionError}</small>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>



}
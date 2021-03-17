import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'


export default function MobilePhotoUpload() {

  const [photoData, updatePhotoData] = useState({
    ...photoData,
    url: '',
    caption: ''
  })
  const [uploadSuccess, updateUploadSuccess] = useState(false)
  const [captionError, updateCaptionError] = useState('')
  const token = localStorage.getItem('token')
  const history = useHistory()
  const [photoError, updatePhotoError] = useState('')
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
        updatePhotoData({
          ...photoData,
          url: result.info.secure_url
        })
        updateUploadSuccess(true)
        updatePhotoError('')
      }
    ).open()
  }
  function handleChange(event) {
    const { name, value } = event.target

    updatePhotoData({ ...photoData, [name]: value })
    updateCaptionError('')
  }

  async function handleSave(event) {
    event.preventDefault()
    if (!photoData.caption) {
      updateCaptionError('Please add a caption to your photo')
      return
    } else if (!photoData.url) {
      updatePhotoError('Please upload a photo')
      return
    } else {
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
  }

  return <div>
    <div className='container has-text-centered'>
      <p className='title'>Hello!</p>
      <p className='subtitle'>We've noticed you're on mobile, if you'd like to edit your photo before you upload it, please check out our website on desktop!</p>
      <p className='subtitle'>Otherwise, please upload and caption your photo below</p>
      <form className='field' onSubmit={handleSave}>
        <div className='field'>
          <div className='control'>
            <button className="button is-hovered is-rounded" onClick={handleUpload}>Upload a picture</button>
            {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
            {photoError && <div><small className='has-text-primary'>{photoError}</small></div>}
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input className='input is-rounded'
              type='text'
              value={photoData.caption}
              onChange={handleChange}
              name={'caption'}
              placeholder='Please add a photo caption'
            />
            {captionError && <small className='has-text-primary'>{captionError}</small>}
          </div>
        </div>
        {token ? <button className='button is-hovered is-rounded' onClick={handleSave}>Save and Publish</button>
          : <p className='subtitle'>Please <Link to='/login'><em>login</em></Link> to save a photo!</p>}
      </form>
    </div>
  </div>
}
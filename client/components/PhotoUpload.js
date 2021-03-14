import React, { useState, useEffect } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from 'axios'
import savePhoto from './PhotoSavingModal'
import { useHistory } from 'react-router-dom'
const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')
const myTheme = {
  'menu.backgroundColor': 'white',
  'common.backgroundColor': '#ffffff',
  'loadButton.innerHTML': 'Upload',
  'tui-image-editor-load-btn.innerHTML': 'Upload',
  'downloadButton.display': 'none',
  'downloadButton.backgroundColor': 'black',
  'downloadButton.borderColor': 'black',
  'downloadButton.color': 'white',
  'menu.normalIcon.path': icond,
  'menu.activeIcon.path': iconb,
  'menu.disabledIcon.path': icona,
  'menu.hoverIcon.path': iconc
}



function PhotoUpload() {
  const [imageSrc, setImageSrc] = useState('')
  const imageEditor = React.createRef()
  const [captionError, updateCaptionError] = useState('')
  const token = localStorage.getItem('token')
  const history = useHistory()
  const [photoData, updatePhotoData] = useState(
    {
      url: cloudinaryURL,
      caption: ''
    })
  
  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst
    const data = imageEditorInst.toDataURL()
    if (data) {
      UploadToCloudinary(data)
    }
  }
  useEffect(() => {
    updatePhotoData({ ...photoData, url: cloudinaryURL })
  }, [cloudinaryURL])



  const [saveModal, updateSaveModal] = useState(false)
  const [cloudinaryURL, updateCloudinaryURL] = useState('')
  async function UploadToCloudinary(photoData) {
    const url = 'https://api.cloudinary.com/v1_1/dqkixqgcu/image/upload'
    const formData = new FormData()

    const file = photoData

    formData.append('file', file)
    formData.append('upload_preset', 'nasx6xsf')
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }

    try {
      const { data } = await axios.post(url, formData, config)
      updateCloudinaryURL(data.secure_url)
      console.log(data.secure_url)
      // updatePhotoData({ ...photoData, url: data.secure_url })
      updateSaveModal(true)
    } catch (err) {
      console.log(err)
    }
  }


  function handleChange(event) {
    const { name, value } = event.target
    console.log(event.target)
    console.log(name)
    console.log(value)
    console.log(photoData)
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
        console.log(photoData.url)
        console.log(cloudinaryURL)
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
  function changeModal() {
    updateSaveModal(true)
  }

  return (
    <div>
      <div>
        <div className="has-text-centered">
          <button className='button is-rounded' onClick={saveImageToDisk}>Save and Publish</button>
        </div>
      </div>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: imageSrc,
            name: 'image'
          },
          theme: myTheme,
          menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'text', 'filter'],
          initMenu: '',
          uiSize: {
            height: '94vh'
          },
          menuBarPosition: 'bottom'
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
      {saveModal && <div className='modal is-active'>
        <div className='modal-background'>
          <div className='modal-content'>
            <div>
              <img src={cloudinaryURL} />
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
                  </div>
                </div>
                <div className="has-text-centered">
                  <button className="button is-hovered is-rounded" onClick={handleSave}>Save Photo</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>}
      <button className="button" onClick={changeModal}>Modal?</button>
    </div>
  )
}
export default PhotoUpload

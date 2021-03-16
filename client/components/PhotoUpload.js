import React, { useState, useEffect } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

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
  const [welcomeMat, updateWelcomeMat] = useState(false)
  const [photoData, updatePhotoData] = useState(
    {
      url: cloudinaryURL,
      caption: ''
    })

  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst
    const data = imageEditorInst.toDataURL()
    if (!token) {
      return
    }
    if (data) {
      UploadToCloudinary(data)
    }
  }



  
  const [cloudinaryURL, updateCloudinaryURL] = useState('')
  async function UploadToCloudinary(data) {
    const url = 'https://api.cloudinary.com/v1_1/dqkixqgcu/image/upload'
    const formData = new FormData()

    const file = data

    formData.append('file', file)
    formData.append('upload_preset', 'nasx6xsf')
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }

    try {
      const { data } = await axios.post(url, formData, config)
      updateCloudinaryURL(data.secure_url)
      const photo = data.secure_url
      const photo2 = String(photo)
      updatePhotoData({ ...photoData, url: photo2 })
      history.push({
        pathname: '/photo-save',
        state: { url: photo2 }
      })
    } catch (err) {
      console.log(err)
    }
  }


  

  

  function closeWelcomeMat() {
    updateWelcomeMat(true)
  }

  return (
    <div>
      <div>
        {token && <div className="has-text-centered">
          <button className='button is-rounded' onClick={saveImageToDisk}>Save and Publish</button>
        </div>}
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
      {!token && !welcomeMat && <div className='modal is-active has-text-centered has-text-white'>
        <div className='modal-background'></div>
        <div className='modal-content is-clipped has-text-centered'>
          <p className='title has-text-white'>Hello!</p><br></br>
          <p className='subtitle has-text-white'>We've noticed you're not logged in, so feel free to upload and edit a photo, but be aware you can't save it</p><br></br>
          <p className='subtitle has-text-white'>However, if you'd like to register or login, please click below!</p>
          <Link to='/login' className='button is-rounded'>Log In</Link>
        </div>
        <button className='modal-close is-large' aria-label="close" onClick={closeWelcomeMat}></button>
      </div>}
    </div>
  )
}
export default PhotoUpload

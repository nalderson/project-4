import React, { useState, useEffect } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from 'axios'
import savePhoto from './PhotoSavingModal'
const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')
const [saveModal, updateSaveModal] = useState(false)
const [cloudinaryURL, updateCloudinaryURL] = useState('')
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
async function UploadToCloudinary(photoData) {
  const url = 'https://api.cloudinary.com/v1_1/dqkixqgcu/image/upload'
  const formData = new FormData()

  const file = photoData

  formData.append('file', file)
  formData.append('upload_preset', 'nasx6xsf')
  const config = {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  }
  console.log(formData)
  // const body = {
  //   file: file,
  //   upload_preset: 'nasx6xsf'
  // }
  // console.log(body)
  try {
    const { data } = await axios.post(url, formData, config)
    updateCloudinaryURL(data)
    console.log(data)
    updateSaveModal(true)
  } catch (err) {
    console.log(err)
  }
  


  // await fetch(url, {
  //   method: 'POST', 
  //   body: body
  // }).then((response) => {
  //   console.log(response.text)
  // })


}

function PhotoUpload() {
  const [imageSrc, setImageSrc] = useState('')
  const imageEditor = React.createRef()
  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst
    const data = imageEditorInst.toDataURL()
    if (data) {
      UploadToCloudinary(data)
    }
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
      {saveModal && savePhoto(cloudinaryURL)}
    </div>
  )
}
export default PhotoUpload

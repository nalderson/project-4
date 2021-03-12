import React, { useState, useEffect } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from 'axios'
const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')
const download = require('downloadjs')

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
  console.log(photoData)
  const file = photoData
  formData.append('file', file)
  formData.append('upload_preset', 'nasx6xsf')
  const { data } = await axios.post(url, formData)
  console.log(data)


  // await fetch(url, {
  //   method: 'POST', 
  //   body: formData
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
      
      // const mimeType = data.split(';')[0]
      // const extension = data.split(';')[0].split('/')[1]
      // download(data, `image.${extension}`, mimeType)
      // This function above will be given an image.png.
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
            height: '100vh'
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
    </div>
  )
}
export default PhotoUpload

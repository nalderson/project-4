import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function IndividualPhoto({ match }) {
  const photo = match.params.photo_id
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU2NjgyOSwiZXhwIjoxNjE1NjUzMjI5fQ.TVE067Sd4eGIwu3dF-CsqD80Ms-s341tfx4gdZYojyk'
  const [images, updateimages] = useState({
    image: []
  })

  useEffect(() => {
    async function getImageData() {
      try {
        const { data } = await axios.get('/api/photos/1', { headers: { 'Authorization': `Bearer ${token}` } })
        updateimages(data)
      } catch (err) {
        console.log(err)
      }
    }
    getImageData()
  }, [])

  console.log(images)

  return <section>
    <div>
      {images.map((image, index) => {
        return <div key={index}>
          <img src={image.url} alt={image.caption} />
        </div>
      })}
    </div>
  </section>
}

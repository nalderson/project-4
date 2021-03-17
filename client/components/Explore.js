import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Explore() {
  const [photos, updatePhotos] = useState([])

  useEffect(() => {
    async function getPhotos() {
      try {
        const { data } = await axios.get('/api/photos')
        updatePhotos(data)

      } catch (err) {
        console.log(err)
      }
    }
    getPhotos()
  }, [])

  
  return <section id="photos" className="container is-centered">
    <div className="has-text-centered"><p className="title" id="picsterTitle">Welcome to Picster</p></div>
    {photos.map((photo, index) => {
      return <div key={index} >
        <Link to={`/explore/${photo.id}`}>
          <img src={photo.url} alt={photo.caption} />
        </Link>
      </div>
    })}
  </section>

}

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

  // return <section className="section is-centered">
  //   <div className="container is-centered">
  //     <div className="columns is-multiline is-mobile is-centered is-vcentered">
  //       {photos.map((photo, index) => {
  //         return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered" >
  //           <Link to={`/explore/${photo.id}`}>
  //             <div className="card">
  //               <div className="card-image">
  //                 <figure className="image">
  //                   <img src={photo.url} alt={photo.caption} />
  //                 </figure>
  //               </div>
  //             </div>
  //           </Link>
  //         </div>
  //       })}
  //     </div>
  //   </div>
  // </section>

  // return <div className="has-text-centered">
  //   <p className="title">Welcome to Picster!</p>
  //   <section id="photos" className="container is-centered">
  //     {photos.map((photo, index) => {
  //       return <div key={index} >
  //         <Link to={`/explore/${photo.id}`}>
  //           <img src={photo.url} alt={photo.caption} />
  //         </Link>
  //       </div>
  //     })}
  //   </section>
  // </div>
  return <section id="photos" className="container is-centered">
    <p className="title" id="picsterTitle">Welcome to Picster!</p>
    {photos.map((photo, index) => {
      return <div key={index} >
        <Link to={`/explore/${photo.id}`}>
          <img src={photo.url} alt={photo.caption} />
        </Link>
      </div>
    })}
  </section>

}

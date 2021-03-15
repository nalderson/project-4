import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DisplayFollowing from './DisplayFollowing'

export default function Explore({ history, match }) {

  const [profile, updateProfile] = useState({
    photos: [],
    following_current_user: [{}]
  })
  // const [buttonNum, updateButtonNum] = useState(1)
  const token = localStorage.getItem('token')

  const username = match.params.username

  useEffect(() => {
    async function getProfileData() {
      try {
        const { data } = await axios.get('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } })
        updateProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfileData()
  }, [])

  console.log(profile)
  console.log(profile.photos)
  console.log(profile.following_users)


  // var settings = {
  //   arrows: true,
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   autoplay: false
  // }

  // const sliderStyle = {
  //   width: '100vw',
  //   height: '25%'
  // }

  function DisplaySavedPhotos() {
    return <div className="saved-photos">
      {/* <h1>This will display saved photos in a carousel</h1> */}
      {/* <Slider {...settings} style={sliderStyle}>
        {profile.photos.map(photo => {
          return <Link to={{ pathname: '/explore/:photo_id' }}
            key={photo.id}>
            <img src={photo.url} alt={photo.caption} />
          </Link>
        })}
      </Slider> */}
    </div>
  }

  return <div className="container is-vcentered">
    <div className="container is-vcentered block box" id="account-header">
      <img id="account-profile-pic" src={profile.profile_picture} />
      <h1 id="account-title" className="title">{profile.username}</h1>

      <div className="container is-center">
        {/* <DisplaySavedPhotos /> */}
        <DisplayFollowing history={history} />
      </div>
    </div>
    <div className="block box">
      <section className="section is-centered">
        <div className="container is-centered">
          <div className="columns is-multiline is-mobile is-centered">
            {profile.photos.map((photo, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile is-centered">
                <Link to={{ pathname: '/explore/:photo_id' }}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={photo.url} alt={photo.caption} />
                      </figure>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  </div>
}
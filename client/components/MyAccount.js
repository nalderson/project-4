import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default function Explore({ history }) {

  const [profile, updateProfile] = useState({
    photos: [],
    following_current_users: []
  })
  const [buttonNum, updateButtonNum] = useState(1)
  // const token = localStorage.getItem('token')
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU2NjgyOSwiZXhwIjoxNjE1NjUzMjI5fQ.TVE067Sd4eGIwu3dF-CsqD80Ms-s341tfx4gdZYojyk'

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
  console.log()

  var settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false
  }

  const sliderStyle = {
    width: '100vw',
    height: '25%'
  }

  function DisplaySavedPhotos() {
    return <div className="saved-photos">
      <h1>This will display saved photos in a carousel</h1>
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

  function DisplayFollowing() {
    return <div className="following">
      <h1>This will display following user images in a carousel</h1>
      <Slider {...settings} style={sliderStyle} >
        {profile.following_users.following_current_users.map((follower, index) => {
          return <Link to={{ pathname: '/profile/:username' }}
            key={index}>
            <img src={follower.profile_picture} alt={follower.username} />
            <p>{follower.username}</p>
          </Link>
        })}
      </Slider>
    </div>
  }

  return <div>
    <h1>{profile.username}</h1>
    <img src={profile.profile_picture} />
    <h2>My Photos</h2>
    <Slider {...settings} style={sliderStyle} >
      {profile.photos.map((photo, index) => {
        return <Link to={{ pathname: '/explore/:photo_id' }}
          key={index}>
          <img src={photo.url} alt={photo.caption} />
        </Link>
      })}
    </Slider>
    <nav>
      <button onClick={() => updateButtonNum(1)}>Saved Photos</button>
      <button onClick={() => updateButtonNum(2)}>Followers</button>
    </nav>
    <div className="button-container">
      {buttonNum === 1 && <div><DisplaySavedPhotos /></div>}
      {buttonNum === 2 && <div><DisplayFollowing /></div>}
    </div>
  </div>
}



import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default function Explore({ history }) {

  const [profile, updateProfile] = useState({
    photos: [],
    following_users: [{}]
  })
  const [buttonNum, updateButtonNum] = useState(1)
  // const token = localStorage.getItem('token')
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTcyNDU0NywiZXhwIjoxNjE1ODEwOTQ3fQ.09WCfj247RFLmQ7mm3houJpj9OxggvZfyTDkllqWPhA'

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
        {profile.following_users.map((follower, index) => {
          return <Link to={{ pathname: `/profile/${follower.username}` }} key={index}>
            <img src={follower.following_current_user.profile_picture} alt={follower.following_current_user.username} />
            <h4>{follower.following_current_user.username}</h4>
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



import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default function Explore({ history, match }) {

  const [profile, updateProfile] = useState({
    photos: [],
  })

  // const token = localStorage.getItem('token')
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTcyNDU0NywiZXhwIjoxNjE1ODEwOTQ3fQ.09WCfj247RFLmQ7mm3houJpj9OxggvZfyTDkllqWPhA'
  const username = match.params.username

  useEffect(() => {
    async function getProfileData() {
      try {
        const { data } = await axios.get(`/api/profile/${username}`, { headers: { 'Authorization': `Bearer ${token}` } })
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
  </div>
}
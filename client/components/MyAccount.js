import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


export default function Explore({ history, match }) {

  const [profile, updateProfile] = useState({
    photos: [],
    following_current_user: [{}]
  })
  const [buttonNum, updateButtonNum] = useState(1)
  // const token = localStorage.getItem('token')
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTgwODU5NCwiZXhwIjoxNjE1ODk0OTk0fQ.TjEgWk83RMQ0kj_3OtXLGeuogtkcVzwXslj86aGIkrY'
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

  // function DisplayFollowing() {
  //   return <div className="following">
  //     <h1>This will display following user images in a carousel</h1>
  //     <Slider {...settings} style={sliderStyle} >
  //       {profile.following_current_user.map((follower, index) => {
  //         if ('following_user' in follower) {
  //           return <Link to={{ pathname: `/profile/${follower.following_user.username}` }} key={index}>
  //             <img src={follower.following_user.profile_picture} alt={follower.following_user.username} />
  //             <h4>{follower.following_user.username}</h4>
  //           </Link>
  //         }

  //       })}
  //     </Slider>
  //   </div>
  // }

  return <div className="container is-vcentered">
    <div className="container is-vcentered block box" id="account-header">
      <img id="account-profile-pic" src={profile.profile_picture} />
      <h1 id="account-title" className="title">{profile.username}</h1>
      <nav>
        <button className="account-buttons button is-dark is-rounded" onClick={() => updateButtonNum(1)}>Saved Photos</button>
        <button id="followers-button" className="account-buttons button is-dark is-rounded" onClick={() => updateButtonNum(2)}>Followers</button>
      </nav>
      <div className="button-container">
        {buttonNum === 1 && <div><DisplaySavedPhotos /></div>}
        {buttonNum === 2 && <div><DisplayFollowing /></div>}
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
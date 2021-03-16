import React from 'react'
import { Link } from 'react-router-dom'
// import HomeHero from '../images/HomeHero.jpg'

export default function Home() {
  // return <section>
  //   <img src={HomeHero} />
  //   <Link to="/explore" className="button">
  //     Explore
  //   </Link>
  // </section>
  

  return <section className="hero is-fullheight header-image is-primary">
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">Welcome to Picster!</p>
        <Link to="/explore" className="button is-rounded" id="hero-button">
          Explore
        </Link>

      </div>
    </div>
  </section>
}

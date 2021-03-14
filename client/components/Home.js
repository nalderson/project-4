import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return <section>
    <img src='../images/logo.png' />
    <Link to="/explore" className="button">
      Explore
    </Link>
  </section>
}

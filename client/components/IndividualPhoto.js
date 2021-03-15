import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

export default function IndividualPhoto({ match }) {
  const id = match.params.id
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTczMTYzNSwiZXhwIjoxNjE1ODE4MDM1fQ.X8uUhhwIivewOSXg-RcWs5ZJDLni6v8arqnmn757CuE'
  const [images, updateimages] = useState({
    image: []
  })

  useEffect(() => {
    async function getImageData() {
      try {
        const { data } = await axios.get(`/api/photos/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
        updateimages(data)
      } catch (err) {
        console.log(err)
      }
    }
    getImageData()
  }, [])


  // Create Comment async function
  async function createComment(commentId) {
    await axios.post(`api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTitle('')
    setComment('')
    updateComments(data)
  }

  // Remove Comment async function
  async function removeComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateComment(resp.data)
      })
  }

  // Update Comment async 
  async function removeComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateComment(resp.data)
      })
  }


  console.log(images)

  return <section>
    <div>
      {images.map((image, index) => {
        return <div key={index}>
          <img src={image.url} alt={image.caption} />
          <h4>{image.caption}</h4>
          <p>{image.comments.content}</p>
          <div>
            <textarea
              className="textarea"
              placeholder="Comment Below..."
              onChange={event => setComment(event.target.value)}
              value={comment}
            >
              {comment}
            </textarea>

          </div>
        </div>
      })}
    </div>
  </section>
}

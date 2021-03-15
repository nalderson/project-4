import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'

export default function IndividualPhoto({ match }) {
  const id = match.params.photo_id
  const token = localStorage.getItem('token')
  const [images, updateimages] = useState({
    image: []
  })
  const loggedIn = getLoggedInUserId()
  const [editNumber, updateEditNumber] = useState(0)
  const [commentIdentifier, updateCommentIdentifier] = useState('')
  const [comment, setComment] = useState('')

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

  console.log(images)

  // Post Comment
  async function postComment(commentId) {
    const { data } = await axios.post(`api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setComment('')
    updateImages(data)
  }

  // Remove Comment
  async function removeComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateImages(resp.data)
      })
  }

  // Update Comment
  async function handleEditCommentOne(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.get(`/api/photos/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(resp => {
      setComment(resp.data.comment)
      updateEditNumber(1)
      updateCommentIdentifier(commentId)
    })
  }
  async function handleEditCommentTwo() {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/photos/${id}/comments/${commentIdentifier}`, { comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateImages(resp.data)
        updateEditNumber(0)
        updateCommentIdentifier('')
      })
  }

  return <section className="container is-vcentered">
    <div>
      <div className="container is-vcentered block box">
        <img src={images.url} alt={images.caption} />
        <h4>{images.caption}</h4>
      </div>
      {images.comments && images.comments.map(commenting => {
        return <div key={commenting.id} className="container is-vcentered block box">
          <p>{commenting.user.username}</p>
          <img src={commenting.user.profile_picture}/>
          <p>{commenting.comment}</p>

          {isCreator(commenting.user._id) && <div>
            <button onClick={() => removeComment(commenting._id)}>
              Delete
              </button>
          </div>}

          {isCreator(commenting.user._id) && <div>
            <button onClick={() => handleEditCommentOne(commenting._id)}>
              Update
            </button>
          </div>}

          {loggedIn && <div>
            <textarea
              className="textarea"
              placeholder="Share your experience..."
              onChange={event => setComment(event.target.value)}
              value={comment}>
              {comment}
            </textarea>
            <div>
              {editNumber === 0 && <button onClick={postComment} className="button is-info">Submit</button>}
              {editNumber === 1 && <button onClick={handleEditCommentTwo} className="button is-info">Update Comment</button>}
            </div>
          </div>}
        </div>
      })}
    </div>
  </section>
}
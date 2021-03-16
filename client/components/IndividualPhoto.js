import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'

export default function IndividualPhoto({ match }) {
  const id = match.params.photo_id
  const token = localStorage.getItem('token')
  const [thisImage, updateThisImage] = useState({
    image: []
  })
  const loggedIn = getLoggedInUserId()
  const [newCommentData, updateNewCommentData] = useState({
  })
  const [commentData, updateCommentData] = useState({
    content: ''
  })
  const [commentError, updateCommentError] = useState('')
  const [editingComment, updateEditingComment] = useState(false)

  useEffect(() => {
    async function getImageData() {
      try {
        const { data } = await axios.get(`/api/photos/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
        updateThisImage(data)
      } catch (err) {
        console.log(err)
      }
    }
    getImageData()
  }, [])


  // Post Comment
  async function postComment() {
    if (!commentData.content) {
      updateCommentError('Please add some text')
      return
    }
    try {
      console.log(commentData.content)
      console.log(commentData)
      const { data } = await axios.post(`/api/photos/${id}/comments`, commentData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCommentData({ ...commentData, content: '' })
      updateThisImage(data)
    } catch (err) {
      console.log(err)
    }
  }

  // Remove Comment
  async function removeComment(commentId) {
    if (!isCreator) {
      return null
    }
    try {
      const { data } = await axios.delete(`/api/photos/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateThisImage(data)
    } catch (err) {
      console.log(err)
    }
  }

  // Function Update Comment
  async function handleUpdateComment(commentId) {
    try {
      const { data } = await axios.put(`/api/photos/${id}/comments/${commentId}`, newCommentData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateThisImage(data)
      updateEditingComment(false)
    } catch (err) {
      console.log(err)
    }
  }

  // Handle change
  function handleChange(event) {
    const { name, value } = event.target
    updateCommentData({ ...commentData, [name]: value })
  }
  function handleEditingChange(event) {
    const { name, value } = event.target
    updateNewCommentData({ ...newCommentData, [name]: value })
  }
  function openEditingModal() {
    updateEditingComment(!editingComment)
    updateNewCommentData(commentData)
  }

  async function likeButton() {
    let numLikes = thisImage.rating
    numLikes++
    const newRating = { rating: numLikes }
    const { data } = await axios.put(`/api/photos/${id}`, newRating, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateThisImage(data)
  }
  const history = useHistory()

  async function goBack() {
    history.go(-1)
  }

  return <section className="container is-vcentered ">
    <div>
      <button className="button is-light is-rounded" id="back-button" onClick={goBack}>Back</button>
      <div className="container is-vcentered block box is-three-quarters-desktop has-text-centered">
        <img src={thisImage.url} alt={thisImage.caption} />
        <h4>{thisImage.caption}</h4>
        {loggedIn && <div className="has-text-right"><button onClick={likeButton}>❤️ {thisImage.rating}</button></div>}
      </div>
      <h2 className="subtitle">Comments</h2>
      <div className="is-half-desktop " id="comments">
        {thisImage.comments && thisImage.comments.map(commenting => {
          return <article key={commenting.id} className="media is-half-desktop">
            <div className="media-content is-half-desktop">
              <p>{commenting.user.username}</p>
              <img className="image is-64x64" src={commenting.user.profile_picture} />
              <div className="content">
                <figure>
                  <p>{commenting.content}</p>
                </figure>
              </div>
            </div>

            {isCreator(commenting.user.id) && <div className="media-right">
              <button className="delete" onClick={() => removeComment(commenting.id)}>
                Delete
              </button>
              <button className="delete" id="edit" onClick={openEditingModal}>
                Update
              </button>
            </div>}
            {
              isCreator(commenting.user.id) && editingComment && <div>
                <textarea
                  className="textarea"
                  placeholder="Please write a new comment"
                  onChange={handleEditingChange}
                  value={newCommentData.content}
                  name={'content'}>
                </textarea>
                <button className="button is-rounded" onClick={() => handleUpdateComment(commenting.id)}>Save</button>
              </div>
            }
          </article>
        })}
      </div>
      {
        loggedIn && <div>
          <textarea
            className="textarea"
            placeholder="Please write your comment"
            onChange={handleChange}
            value={commentData.content}
            name={'content'}>
          </textarea>
          {commentError && <small className='has-text-primary'>{commentError}</small>}
          <div>
            <button onClick={postComment} className="button is-info">Submit</button>
          </div>
        </div>
      }
    </div >
  </section >

}
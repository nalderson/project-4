import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

  // Function to Update a Comment

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

  return <section className="container is-vcentered">
    <div>
      <div className="container is-vcentered block box">
        <img src={thisImage.url} alt={thisImage.caption} />
        <h4>{thisImage.caption}</h4>
      </div>
      {thisImage.comments && thisImage.comments.map(commenting => {
        console.log(commenting)
        return <div key={commenting.id} className="container is-vcentered block box">
          <p>{commenting.user.username}</p>
          <img src={commenting.user.profile_picture} />
          <p>{commenting.content}</p>

          {isCreator(commenting.user.id) && <div>
            <button className="button is-rounded" onClick={() => removeComment(commenting.id)}>
              Delete
            </button>
          </div>}
          {isCreator(commenting.user.id) && <div>
            <button className="button is-rounded" onClick={openEditingModal}>
              Update
            </button>
          </div>}
          {isCreator(commenting.user.id) && editingComment && <div>
            <textarea
              className="textarea"
              placeholder="Please write a new comment"
              onChange={handleEditingChange}
              value={newCommentData.content}
              name={'content'}>
            </textarea>
            <div>
              <button className="button is-rounded" onClick={() => handleUpdateComment(commenting.id)}>Save</button>
            </div>
          </div>}


        </div>
      })}
      {loggedIn && <div>
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
      </div>}
    </div>
  </section>
}
import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {

  const [regData, updateRegData] = useState({
    username: '',
    email: '',
    password: '',
    profile_picture: 'https://i.pinimg.com/564x/f2/b6/e4/f2b6e41cda9aed63ecbcd32de69b825a.jpg'
  })

  const [passwordConfirmationData, updatePasswordConfirmationData] = useState({
    passwordConfirmation: ''
  })

  const [regErrors, updateRegErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profile_picture: ''
  })

  const [registrationSuccess, updateRegistrationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)


  function handleChange(event) {
    const { name, value } = event.target

    updateRegData({ ...regData, [name]: value })
    updateRegErrors({ ...regErrors, [name]: '' })
  }

  function handlePasswordConfirmationChange(event) {
    const { name, value } = event.target
    updatePasswordConfirmationData({ ...passwordConfirmationData, [name]: value })
    updateRegErrors({ ...regErrors, [name]: '' })
  }

  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dqkixqgcu',
        uploadPreset: 'nasx6xsf',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateRegData({
          ...regData,
          profile_picture: result.info.secure_url
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (passwordConfirmationData.passwordConfirmation !== regData.password) {
      updateRegErrors({ ...regErrors, ['passwordConfirmation']: 'Password did not match' })
      return
    }
    console.log(regData)
    try {
      await axios.post('/api/signup', regData)
      updateRegistrationSuccess(true)
      history.push('/login')
    
    } catch (err) {
      updateRegErrors(err.response.data)
    }
  }
  

  return <section className="hero is-fullheight">
    <div className="hero-body" id="register-hero">
      <div className="container">

        <main className='column'>
          <div className='column is-flex is-flex-direction-column is-align-items-center'>
            <h1 className='titles'>Register</h1>
            <form className='field' onSubmit={handleSubmit}>

              <div className='field'>
                <label className='labels'>Username</label>
                <div className='control'>
                  <input className='input is-rounded'
                    type="text"
                    value={regData.username}
                    onChange={handleChange}
                    name={'username'}
                  />
                  {regErrors.username && <small className="has-text-primary">{regErrors.username}</small>}
                </div>
              </div>

              <div className='field'>
                <label className='labels'>Email</label>
                <div className='control'>
                  <input className='input is-rounded'
                    type="text"
                    value={regData.email}
                    onChange={handleChange}
                    name={'email'}
                  />
                  {regErrors.email && <small className="has-text-primary">{regErrors.email}</small>}
                </div>
              </div>

              <div className='field'>
                <label className='labels'>Password</label>
                <div className='control'>
                  <input className='input is-rounded'
                    type="password"
                    value={regData.password}
                    onChange={handleChange}
                    name={'password'}
                  />
                  {regErrors.password && <small className="has-text-primary">{regErrors.password.messages}</small>}
                </div>
              </div>
              <div className='field'>
                <label className='labels'>Password Confirmation</label>
                <div className='control'>
                  <input className='input is-rounded'
                    type='password'
                    value={passwordConfirmationData.passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                    name={'passwordConfirmation'}
                  />
                  {regErrors.passwordConfirmation && <small className="has-text-primary">{regErrors.passwordConfirmation}</small>}
                </div>
              </div>
              <div className='field'>
                <label className='labels'>Profile Picture (optional)</label>
                <div className='control'>
                  <button className="button is-rounded" onClick={handleUpload}>Upload a profile picture</button>
                  {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
                </div>
              </div>

              <div className="control">
                <button className="button is-rounded">Register</button>
                {registrationSuccess && <div><small className="has-text-primary">Registration Successful!</small></div>}
              </div>
            </form>
          </div>
        </main>

      </div>
    </div>
  </section>
}


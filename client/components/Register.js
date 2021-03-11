import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {

  const [regData, updateRegData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: 'https://i.pinimg.com/564x/f2/b6/e4/f2b6e41cda9aed63ecbcd32de69b825a.jpg'
  })

  // const [regErrors, updateRegErrors] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   image: '',
  // })

  const [registrationSuccess, updateRegistrationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)

  // console.log(regErrors)

  function handleChange(event) {
    const { name, value } = event.target

    updateRegData({...regData,[name]: value})
    // updateRegErrors({ ...regErrors, [name]: '' })
  }

  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'Pinstagram',
        uploadPreset: 'mww9imzw',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateRegData({
          ...regData,
          image: result.info.secure_url
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/signup', regData)
      console.log(data)
      updateRegistrationSuccess(true)
      history.push('/login')
    } catch (err) {
      console.log('The error is:', err.response.data.errors)
      // updateRegErrors(err.response.data.errors)
    }
  }


  return <section className="hero is-danger is-fullheight">
      <div className="hero-body" id="herobackground">
        <div className="container">

          <main className='column'>
            <div className='column is-flex is-flex-direction-column is-align-items-center'>
              <h1 className='titles'>Register</h1>
              <form className='field' onSubmit={handleSubmit}>

                <div className='field'>
                  <label className='labels'>Username</label>
                  <div className='control'>
                    <input className='input'
                      type="text"
                      value={regData.username}
                      onChange={handleChange}
                      name={'username'}
                    />
                    {/* {regErrors.username && <small className="has-text-danger">{regErrors.username.message}</small>} */}
                  </div>
                </div>

                <div className='field'>
                  <label className='labels'>Email</label>
                  <div className='control'>
                    <input className='input'
                      type="text"
                      value={regData.email}
                      onChange={handleChange}
                      name={'email'}
                    />
                    {/* {regErrors.email && <small className="has-text-danger">{regErrors.email.message}</small>} */}
                  </div>
                </div>

                <div className='field'>
                  <label className='labels'>Password</label>
                  <div className='control'>
                    <input className='input'
                      type="password"
                      value={regData.password}
                      onChange={handleChange}
                      name={'password'}
                    />
                    {/* {regErrors.password && <small className="has-text-danger">{regErrors.password.message}</small>} */}
                  </div>
                </div>
                <div className='field'>
                  <label className='labels'>Password Confirmation</label>
                  <div className='control'>
                    <input className='input'
                      type='password'
                      value={regData.passwordConfirmation}
                      onChange={handleChange}
                      name={'passwordConfirmation'}
                    />
                    {/* {regErrors.passwordConfirmation && <small className="has-text-danger">{regErrors.passwordConfirmation.message}</small>} */}
                  </div>
                </div>
                <div className='field'>
                  <label className='labels'>Profile Picture (optional)</label>
                  <div className='control'>
                    <button className="button" onClick={handleUpload}>Upload a profile picture</button>
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
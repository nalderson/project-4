import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
// import 'bulma'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Explore from './components/Explore'
import IndividualPhoto from './components/IndividualPhoto'
import PhotoUpload from './components/PhotoUpload'
import MobilePhotoUpload from './components/MobilePhotoUpload.js'
import MyAccount from './components/MyAccount'
import UserSearch from './components/UserSearch'
import FollowerProfile from './components/FollowerProfile'
import PhotoSave from './components/savePhotoPage'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/explore" component={Explore}/>
      <Route exact path="/explore/:photo_id" component={IndividualPhoto}/>
      <Route exact path="/photo-upload" component={PhotoUpload} />
      <Route exact path="/photo-save" component={PhotoSave} />
      <Route exact path="/mobile-photo-upload" component={MobilePhotoUpload} />
      <Route exact path="/profile/usersearch" component={UserSearch} />
      <Route exact path="/profile/:user_id" component={FollowerProfile} />
      <Route exact path="/profile/myprofile/:username" component={MyAccount} />
      <Route exact path="/users" component={UserSearch} />
    </Switch>
  </BrowserRouter>
)

export default App
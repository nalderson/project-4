import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import 'bulma'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Explore from './components/Explore'
import IndividualPhoto from './components/IndividualPhoto'
import PhotoUpload from './components/PhotoUpload'
// import PhotoEditingModal from './components/PhotoEditingModal'
import MyAccount from './components/MyAccount'
import UserSearch from './components/UserSearch'
import FollowerProfile from './components/FollowerProfile'

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
      {/* <Route exact path="/photo-upload/edit" component={PhotoEditingModal} /> */}
      <Route exact path="/profile/usersearch" component={UserSearch} />
      <Route exact path="/profile/:username" component={FollowerProfile} />
      <Route exact path="/profile/myprofile/:username" component={MyAccount} />
    </Switch>
  </BrowserRouter>
)

export default App
import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Header from "./Components/Header"
import PrivateRoute from './Components/PrivateRoute'
import UpdateListing from './Pages/UpdateListing'
import CreateListing from './Pages/createListing'


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route element = {<PrivateRoute/>}>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/createListing" element={<CreateListing/>}/>
          <Route path="/updateListing/:listingId" element={<UpdateListing/>}/>
        </Route>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
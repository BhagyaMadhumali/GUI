import React from 'react'
 import AdminLogin from './Adminlogin/Adminlogin';
 import Registerform from './Registerform/registerform';
 import Forgetpassword from './Forgetpassword/forgetpassword';
 import Home from './Home/home';
 import Alldoctors from './Alldoctors/alldoctors';   
 import Gynecologist from './Gynecologist/gynecologist';
 import Neurologist from './Neurologist/Neurologist';
import Pediatricians from './Pediatricians/Pediatricians';   
 import Gastroenterologist from './Gastroenterologist/Gastroenterologist';
import Dermotologist from './Dermotologist/dermotologist';   
import ContactUs from './ContactUs/contactus';
import AboutUs from './AboutUs/aboutus';
import AddDoctor from './Adddoctor/adddoctor';
import Appointment from './Appointment/appointment';
import Generalphysician from './Generalphysician/generalphysician';
import AdminForgetpassword from './AdminForgetpassword/adminforpassword';
import AdminRegisterform from './Adminregisterform/adminregisterform';
import AdminHeader from './Adminheader/adminheader'
import Messages from './Messages/messages';
import Login from './LoginFile/Loginfile';

import {BrowserRouter , Route, Routes} from 'react-router-dom'
function App() {
return (
 

  <div>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}> </Route>
    <Route path="/home" element={<Home/>}> </Route>
    <Route path="/registerform" element={<Registerform/>}> </Route>
    <Route path="/adminlogin" element={<AdminLogin/>}> </Route>
    <Route path="/logout" element={<Login/>}> </Route>
    <Route path="/forgetpassword" element={<Forgetpassword/>}> </Route>
    <Route path="/home" element={<Home/>}> </Route>
    <Route path="/alldoctors" element={<Alldoctors/>}> </Route>
    <Route path="/aboutus" element={<AboutUs/>}> </Route>
    <Route path="/contactus" element={<ContactUs/>}> </Route>
    <Route path="/gynecologist" element={<Gynecologist/>}> </Route>
    <Route path="/Neurologist" element={<Neurologist/>}> </Route>
    <Route path="/Pediatricians" element={<Pediatricians/>}> </Route>
    <Route path="/Gastroenterologist" element={<Gastroenterologist/>}> </Route>
    <Route path="/dermotologist" element={<Dermotologist/>}> </Route>
    <Route path="/generalphysician" element={<Generalphysician/>}> </Route>
    <Route path="/adminheader" element={<AdminHeader/>}> </Route>
    <Route path="/adddoctor" element={<AddDoctor/>}> </Route>
    <Route path="/appointment" element={<Appointment/>}> </Route>
    <Route path="/adminforgetpassword" element={<AdminForgetpassword/>}> </Route>
    <Route path="/adminregisterform" element={<AdminRegisterform/>}> </Route>
    <Route path="/messages" element={<Messages/>}> </Route>

    <Route path="/adminforgetpasswordlogin" element={<AdminHeader/>}> </Route>
  
  </Routes>
  </BrowserRouter> 
  </div>

)
}

export default App;

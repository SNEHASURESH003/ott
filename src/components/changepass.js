import Navbar from "./Navbar";
import sign from '../images/bg.jpg'; 
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Changepass() {
   var [current_password, setCurrentPassword] = useState('');
      var [new_password, setNewPassword] = useState('');
         var [passwordConf, setPasswordConf] = useState('');
      var [errorMessage, setErrorMessage] = useState('');
       var navigate = useNavigate();
      function changePassword() {
        if (!current_password || !new_password || !passwordConf) {
    setErrorMessage('All fields are required.');
    return;
}
        if (new_password !== passwordConf) {
            setErrorMessage('Passwords do not match.');
            return;
        }

       const token = localStorage.getItem('authtoken');
if (!token) {
    setErrorMessage('You must be logged in to change your password.');
    return;
}
        axios.post('http://127.0.0.1:8000/api/changepassword/', {
    current_password: current_password,
    new_password: new_password
}, {
    headers: {
      Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
    }
}).then(response=>{
            setErrorMessage('')
           navigate('/login');
           
        })
        .catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to change password')
            }
        })
    }
  return (
    <div>
      
      <img src={sign} alt="Background" className="fullscreen-image" />

     
      <Navbar />

     
      <div className="container mt-5" >
                 <div
        className="d-flex align-items-center justify-content-center"
        style={{ marginLeft: "240px", minHeight: "90vh" }}
      >
        <div className="col-md-6">
          <div
            className="card shadow-lg rounded-4"  style={{
                width: '100%',
                maxWidth: '500px',
                background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
                backdropFilter: 'blur(8px)',
                color: 'white',
              }}
            
          >
            <div className="card-body ">
              <h3 className="card-title text-center mb-12 p-b12">CHANGE PASSWORD</h3>
                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}

              <div className="form-group mb-3">
                <input
                  type="password"
                      className="form-control bg-transparent text-white border-white"
                
                  placeholder="Current Password"
                  required
                     value={current_password}
                        onInput={(event)=>setCurrentPassword(event.target.value)}
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="password"
                     className="form-control bg-transparent text-white border-white"
                  placeholder="New Password"
                  required
                     value={new_password}
                        onInput={(event)=>setNewPassword(event.target.value)}
                />
              </div>
              
              <div className="form-group mb-4">
                <input
                  type="password"
                     className="form-control bg-transparent text-white border-white"
                  placeholder="Confirm New Password"
                  required
                  value={passwordConf}
                        onInput={(event)=>setPasswordConf(event.target.value)}
                />
              </div>
<div className="d-flex" style={{ gap: '39px' }}>
  <button className="btn btn-primary p-2" style={{ flex: '0 0 45%' }}  onClick={changePassword}>Save</button>
  <button className="btn btn-danger p-2" style={{ flex: '0 0 45%' }}   onClick={() => navigate('/login')}>Cancel</button>
</div>


            
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Changepass;
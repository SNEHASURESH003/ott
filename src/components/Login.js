
import Navbar from "./Navbar";
import sign from '../images/bg.jpg'; 
import { useState } from "react";


import { useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
  var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
       var navigate = useNavigate();
      function attemptLogin() {
        axios.post(' http://127.0.0.1:8000/api/login/',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            console.log(response.data)
            const token = response.data.token;
            localStorage.setItem('authtoken', token);
              navigate('/movies');

        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user.')
            }
        })
    }

  return (
    <div>
      <img src={sign} alt="Background" className="fullscreen-image" />

      <Navbar />

      <div className="container mt-5">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ marginLeft: "240px", minHeight: "90vh" }}
        >
          <div className="col-md-8">
            <div
              className="card shadow-lg rounded-4"
              style={{
                width: '100%',
                maxWidth: '500px',
                background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
                backdropFilter: 'blur(8px)',
                color: 'white',
              }}
            >
              <div className="card-body">
                <h3 className="card-title text-center mb-8">LOGIN</h3>
                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}

                <div className="form-group mb-6">
                  <input
                    type="email"
                    className="form-control bg-transparent text-white border-white"
                    placeholder="Email"
                    required
                    style={{ borderColor: 'white' }}
                    value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control bg-transparent text-white border-white"
                    placeholder="Password"
                    required
                    style={{ borderColor: 'white' }}
                      value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary w-100" onClick={attemptLogin}>Login</button>
                </div>

                <p className="text-center mt-3">
                  New User?{" "}
                  <a href="/register" className="text-primary">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

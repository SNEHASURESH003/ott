
import Navbar from "./Navbar";
import React  from "react";
import sign from '../images/bg.jpg';
import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
        }
        if (password !== passwordConf) {
        setErrorMessage('Passwords do not match.');
        return;
         }
        axios.post('http://127.0.0.1:8000/api/signup/',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                console.log(error.response.data.errors)
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                console.log(error.response.data.errors)
                setErrorMessage('Failed to connect to api');
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
                style={{ marginLeft: '240px', minHeight: '90vh' }}
            >
                    <div className="col-md-8">
                        <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: '500px',
             
                background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
                backdropFilter: 'blur(8px)',
                color: 'white', }}>
                            <div className="card-body">
                                <h3 className="card-title text-center mb-12 p-b12">REGISTER</h3>
                                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                         className="form-control bg-transparent text-white border-white"
                                      
                                        placeholder="Name"
                                        required
                                        value={name}
                        onInput={(event)=>setName(event.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                         className="form-control bg-transparent text-white border-white"
                                      
                                        placeholder="Email"
                                        required
                                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                         className="form-control bg-transparent text-white border-white"
                                    
                                        placeholder="Password"
                                        required
                                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                         className="form-control bg-transparent text-white border-white"
                                       
                                        placeholder="Confirm Password"
                                        required
                                          value={passwordConf}
                                                 onInput={(event)=>setPasswordConf(event.target.value)}
                                    />
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary w-100"  onClick={registerUser}>
                                        Register
                                    </button>
                                </div>
                                <p className="text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Register;

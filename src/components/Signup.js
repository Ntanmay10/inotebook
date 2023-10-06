import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            //save the auth token 
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Sign In Successful","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }   
    }
     const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header" style={{ textAlign: 'center' }}>
                            Registration Form
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} required minLength={5}/>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <button type="submit" disabled={credentials.password.length<5} className="btn btn-primary my-3">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
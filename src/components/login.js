import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth token 
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Log  In Successful","success");
            navigate('/');
        }
        else {
            props.showAlert("Invalid Credentials","danger");
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
                    <div className="card-header"  style={{textAlign:'center'}}>
                        Login Form
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" value={credentials.password} onChange={onChange}  id="password" name="password" required/>
                            </div>
                            <div style={{textAlign:'center'}}>
                            <button type="submit" className="btn btn-primary my-3">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    )
}

export default Login
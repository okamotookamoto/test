import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const registerUser = () => {
        axios.post('http://127.0.0.1:8000/register', { username, password })
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage(err.response.data.detail));
    };

    const loginUser = () => {
        axios.post('http://127.0.0.1:8000/login', { username, password })
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage(err.response.data.detail));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={registerUser} className="btn btn-primary mr-2">Register</button>
                    <button onClick={loginUser} className="btn btn-success">Login</button>
                    <p className="mt-3">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default App;

// components/Login.js
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4070/login', { email, password })
            .then((response) => {
                alert('Login successful');
                console.log(response)
            })
            .catch((err) => {
                alert('Login failed');
                console.log(err)
            });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <span>Dont have an account? <Link to="/">SigUp here</Link> </span>
            </div>
        </div>
    );
};

export default Login;

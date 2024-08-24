// components/Signup.js
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4070/register', { name, email, password })
            .then((res) => {
                console.log(res)
                alert('Signup successful');
            })
            .catch(() => {
                alert('Signup failed');
            });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <button type="submit">Signup</button>
                </form>
            </div>

            <div>
                <span>Have an account? <Link to="/">Login here</Link> </span>
            </div>
        </div>
    );
};

export default Signup;
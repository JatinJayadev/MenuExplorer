// components/GoogleLogin.js
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from './Firebase';
import axios from 'axios';

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                axios.post('http://localhost:4070/googlelogin', {
                    email: user.email
                })
                    .then((response) => {
                        alert('Login successful');
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log('Error during authentication:', error);
                        alert(error.response.data.error);
                    });
            }).catch((error) => {
                console.error('Error during sign-in with Google:', error);
            });
    };

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Login with Google</button>
        </div>
    );
};

export default GoogleLogin;

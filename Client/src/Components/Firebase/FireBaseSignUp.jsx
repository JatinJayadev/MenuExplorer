import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from './Firebase';
import axios from 'axios';

const provider = new GoogleAuthProvider();

const GoogleSignup = () => {

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)

                axios.post('http://localhost:4070/googlesignup', {
                    name: user.displayName,
                    email: user.email
                })
                    .then((res) => {
                        alert('Signup/Login successful');
                        console.log(res)
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Signup/Login failed');
                    });
            }).catch((error) => {
                console.error('Error during sign-in with Google:', error);
            });
    }

    return (
        <div>
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
        </div>
    );
}

export default GoogleSignup;
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  

    useEffect(() => {
        
        return () => {
            
            setEmail('');
            setPassword('');
        };
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User  logged in:", userCredential);
                navigate('/app'); 
            })
            .catch((error) => {
                console.error("Error logging in:", error.message);
            });
    };

    return (
        <div id='bunny'>
            <h2 id='l'> - - LOGIN - - </h2>
            <input id='l1' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id='l2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button id='l3' onClick={handleLogin}>Login</button>
            <p id='l4'>
              <Link  to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
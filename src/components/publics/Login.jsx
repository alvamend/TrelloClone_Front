import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = 'auth/login';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [message, setMessage] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = await axios.post(LOGIN_URL, { email, password });
                if(response?.status === 200){
                    setAuth({
                        sub: response?.data?.sub,
                        username: response?.data?.username,
                        email: response?.data?.email,
                        role: response?.data?.role,
                        accessToken: response?.data?.accessToken
                    });
                    navigate('/home');
                }
            } catch (error) {
                if (error?.response?.status === 404) {
                    setLoginError(true);
                    setMessage('Email or password incorrect');
                }
                if (error?.response?.status === 400) {
                    setLoginError(true);
                    setMessage('Invalid email format');
                }
            }
        }
    }

    return (
        <main className="form_card">
            <h1>SIGN IN</h1><br />
            {loginError
                ? <div className="instructions">
                    <p>{message}</p>
                </div>
                : ''
            }
            <form className="form" onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Type your email..." onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Type your password..." onChange={e => setPassword(e.target.value)} required />
                <input type="submit" value='Sign in' />
            </form><br />
            <p>Not registered yet?</p>
            <Link to='/signup'>Sign up now for FREE!</Link>
        </main>
    )
};

export default Login;
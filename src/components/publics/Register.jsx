import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const SIGNUP_URL = 'auth/signup';
const Register = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdmatch, setPwdMatch] = useState('');
    const [pwdError, setPwdError] = useState(false);
    const [registeError, setRegisterError] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        if (email && password && username && email && password && pwdmatch && !pwdError) {
            try {
                const response = await axios.post(SIGNUP_URL, {
                    name: name,
                    surname: surname,
                    username: username,
                    email: email,
                    password: password
                });
                if (response?.status === 201) {
                    setSuccess(true);
                }
            } catch (error) {
                if (error?.response?.status === 400) {
                    setRegisterError(true);
                    setMessage(error?.response?.data?.message);
                }
            }
        }
    }

    useEffect(() => {
        password !== pwdmatch ? setPwdError(true) : setPwdError(false);
    }, [password, pwdmatch])

    return (
        success
            ? (
                <main className="form_card">
                    <h3>Account created successfully!</h3>
                    <div style={{height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <p>Go to Login page to access Trello Clone!</p>
                        <Link to='/login'>Log in!</Link>
                    </div>
                </main>
            )
            : (
                <main className="form_card">
                    <h1>SIGN UP</h1><br />
                    {!name || !surname || !username || !email || !password || !pwdmatch || registeError || pwdError ? (
                        <div className="instructions">
                            {!name ? <p>Name cannot be empty</p> : ''}
                            {!surname ? <p>Surname cannot be empty</p> : ''}
                            {!username ? <p>Username cannot be empty</p> : ''}
                            {!email ? <p>Email cannot be empty</p> : ''}
                            {!password ? <p>Password cannot be empty</p> : ''}
                            {!pwdmatch ? <p>Confirm your password</p> : ''}
                            {pwdError ? <p>Passwords do not match</p> : ''}
                            {registeError ? <p style={{ textTransform: 'uppercase' }}>{message}</p> : ''}
                        </div>
                    ) : ''}
                    <form className="form" onSubmit={register}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Enter your name..." onChange={e => setName(e.target.value)} required autoFocus />
                        <label htmlFor="surname">Surname</label>
                        <input type="text" name="surname" placeholder="Enter your surname..." onChange={e => setSurname(e.target.value)} required />
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Enter your username..." onChange={e => setUsername(e.target.value)} required />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Type your email..." onChange={e => setEmail(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Type your password..." onChange={e => setPassword(e.target.value)} required />
                        <label htmlFor="pwdmatch">Confirm Password</label>
                        <input type="password" name="pwdmatch" placeholder="Type your password again..." onChange={e => setPwdMatch(e.target.value)} required />
                        <input type="submit" value='Sign up' />
                        <p style={{ fontStyle: 'italic' }}>Note: Username will be used only to find another user, you MUST login with your email and email can't be changed in the future</p>
                    </form><br />
                    <p>Already have an account?</p>
                    <Link to='/login'>Sign In!</Link>
                </main>
            )
    )
};

export default Register;
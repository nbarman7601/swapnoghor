import React, { useEffect, useState } from 'react';
import './index.css';
import apiService from '../axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/admin');
        }
    }, [])

    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters';
        }

        return newErrors;
    }

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Submit form
            console.log(email, password);
            apiService.post('login', {email, password})
                .then((response)=>{
                    console.log(response);
                    if(response.token){
                        localStorage.setItem('access_token', response.token);
                        navigate('/admin')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
        }
    }

    return (
        <div className='login__container'>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className='item'>
                        <label htmlFor="username">* Username:</label>
                        <input type="text"
                            id="username"
                            name="email"
                            className={errors.email ? 'error_input': ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        {errors.email && <span className='error'>{errors.email}</span>}
                    </div>
                    <div className='item'>
                        <label htmlFor="password">* Password:</label>
                        <input
                            type="password"
                            id="password"
                            className={errors.password ? 'error_input': ''}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        {errors.password && <span className='error'>{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;
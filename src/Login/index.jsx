import React, { useEffect, useState } from 'react';
import classes from './Login.module.css';
import apiService from '../axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false)

    useEffect(()=>{
        if(isAuthenticated()){
            navigate('/');
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
            setShowError((prev)=> false);
            apiService.post('login', {email, password})
                .then((response)=>{
                    console.log(response);
                    if(response.token){
                        localStorage.setItem('access_token', response.token);
                        navigate('/')
                    }
                }).catch((error)=>{
                    setShowError((prev)=> true);
                })
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.lcontainer}>
                {
                    showError && <div className='error-container'>Username or password incorrect</div>
                }
                <h2>Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className={classes.item}>
                        <label htmlFor="username">* Username:</label>
                        <input type="text"
                            id="username"
                            name="email"
                            className={errors.email ? classes.error_input : ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        {errors.email && <span className={classes.error}>{errors.email}</span>}
                    </div>
                    <div className={classes.item}>
                        <label htmlFor="password">* Password:</label>
                        <input
                            type="password"
                            id="password"
                            className={errors.password ? classes.error_input: ''}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        {errors.password && <span className={classes.error}>{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;
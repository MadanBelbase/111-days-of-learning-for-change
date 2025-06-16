import React from 'react';
import { Link } from 'react-router-dom';


import '../styles/signup.css';

const Signup: React.FC = () => {
    return (
        <div className='signup'>
            <div className='signup-form'>
                <h1>Create Your Account</h1>
                <form>
                    <div className='form-group'>
                        <label htmlFor='fullName'>Full Name:</label>
                        <input 
                            type='text' 
                            id='fullName' 
                            name='fullName' 
                            placeholder='Enter your full name'
                            required 
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            placeholder='Choose a username'
                            minLength={4}
                            required 
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='your.email@example.com'
                            required 
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number:</label>
                        <input 
                            type='tel' 
                            id='phone' 
                            name='phone' 
                            placeholder='+1234567890'
                            pattern='[+]{1}[0-9]{11,14}'
                            required 
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='location'>Location (Optional):</label>
                        <input 
                            type='text' 
                            id='location' 
                            name='location' 
                            placeholder='City, Country'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            placeholder='At least 8 characters'
                            minLength={8}
                            required 
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input 
                            type='password' 
                            id='confirmPassword' 
                            name='confirmPassword' 
                            placeholder='Re-enter your password'
                            required 
                        />
                    </div>

                    <div className='form-group terms'>
                        <input 
                            type='checkbox' 
                            id='terms' 
                            name='terms' 
                            required 
                        />
                        <label htmlFor='terms'>
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>

                    <button type='submit' className='submit-btn'>
                        Create Account
                    </button>
                </form>

                <div className='login-link'>
                    <p>Already have an account? <Link to='/login'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
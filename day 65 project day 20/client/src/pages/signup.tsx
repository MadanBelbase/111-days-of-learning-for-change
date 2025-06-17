import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

const Signup: React.FC = () => {
    const [data, setData] = React.useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Optionally: validate password === confirmPassword
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (res.ok) {
                alert('Signup successful!');
                console.log(result);
            } else {
                alert(`Signup failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='signup'>
            <div className='signup-form'>
                <h1>Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='fullName'>Full Name:</label>
                        <input type='text' id='fullName' name='fullName' value={data.fullName} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' name='username' value={data.username} onChange={handleChange} minLength={4} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' value={data.email} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number:</label>
                        <input type='tel' id='phone' name='phone' value={data.phone} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location'>Location:</label>
                        <input type='text' id='location' name='location' value={data.location} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' name='password' value={data.password} onChange={handleChange} minLength={8} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input type='password' id='confirmPassword' name='confirmPassword' value={data.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className='form-group terms'>
                        <input type='checkbox' id='terms' name='terms' checked={data.terms} onChange={handleChange} required />
                        <label htmlFor='terms'>I agree to the Terms of Service and Privacy Policy</label>
                    </div>
                    <button type='submit' className='submit-btn'>Create Account</button>
                </form>

                <div className='login-link'>
                    <p>Already have an account? <Link to='/login'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

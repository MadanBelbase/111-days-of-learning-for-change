import { Link } from "react-router-dom";
import React from "react";
import "../styles/LoginPage.css"; // Assuming you have a CSS file for styling


const LoginPage: React.FC = () => {''

return (
    <div className="login-page">
        <h1>Login</h1>
        <form>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
)
}

export default LoginPage;
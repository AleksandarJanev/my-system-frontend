import React, {useState} from 'react';
import './css/Authentication.css'
import {useAuth} from "./AuthProvider.tsx";
import {Link} from "react-router-dom";
import Register from "./Register.tsx";

const Authentication = () => {
    const {currentUser, handleLogin, handleLogout} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [registerPage, setRegisterPage] = useState(true);

    const handleRegisterPage = () => {
        setRegisterPage((prev) => !prev); // Toggle registerPage
    };

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        handleLogin(formData)
    }


    return (
        <div className={"centered-div"}>
            {currentUser ? (
                <div>
                    <Link to="/protected">Protected Route</Link>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            ) : registerPage ? (
                <div>
                    <Register/>
                    Already registered? <button className={"link-btn"} onClick={() => handleRegisterPage()}>Log in</button>
                </div>
            ) : (
                <div>
                    <form onSubmit={formSubmitHandler}>
                        <input type={"text"} placeholder={"Username"} value={formData.username}
                               onChange={(e) => handleChange('username', e.target.value)}/>
                        <input type={"password"} placeholder={"Password"} value={formData.password}
                               onChange={(e) => handleChange('password', e.target.value)}/>
                        <button>Login</button>
                    </form>
                    <button className={"link-btn"} onClick={() => handleRegisterPage()}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Authentication;

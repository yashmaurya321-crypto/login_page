import { useState } from 'react'
import React  from 'react'
import './login.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { set } from 'mongoose';


const Login = ( {setLoginUser}) =>{
   
    const navigate = useNavigate();
    const[ user, setUser] = useState({
     email : "",
        password : "",
    })
    const handleChange = e =>{
        
        const{name, value} = e.target
        setUser({
            ...user,
            [name]: value,
          });
    }
    const login = () => {
        axios.post("http://localhost:9000/login", user).then(res => {
            alert(res.data.message);
            setLoginUser(res.data.user);
            navigate("/"); // Use history for navigation
        });
    };
return(
    <div className='login'>
        {console.log(user)}
        <h1>Login</h1>
        <input
  type="text"
  placeholder="Enter your email"
  name="email" // Make sure the name attribute is set to "email"
  value={user.email}
  onChange={handleChange}
/>
<input
  type="password"
  placeholder="Enter your password"
  name="password" // Make sure the name attribute is set to "password"
  value={user.password}
  onChange={handleChange}
/>
        <div className='button' onClick={login}>Login</div>
        <div>or</div>
        <div className='button' onClick={() => navigate("/register")}>Register</div> {/* Use navigate for routing */}
    </div>
)
}
export default Login ;

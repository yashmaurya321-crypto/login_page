import logo from './logo.svg';
import './App.css';
import Homepage from './component/homepage/homepage.jsx'
import Login from './component/login/login.jsx'
import Register from './component/register/register.jsx'
import {
  BrowserRouter as Router,
  Route, // Import Route
  Routes
} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [user, setLoginUser] = useState({})
  return (
    <div className='app'>
      <Router> {/* Use Router here */}
        <Routes>
          <Route path="/" element={user && user._id ?<Homepage /> : <Login setLoginUser = {setLoginUser}/>} /> {/* Use element prop to specify the component */}
          <Route path="/login" element={<Login setLoginUser = {setLoginUser}/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

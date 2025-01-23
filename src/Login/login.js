import React, {useState} from 'react'
import './login.css'
import logo from '../LoghiTGM/ScrittaBianca2.png'
import { useNavigate } from 'react-router-dom'

function Login({onLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'tg-admin' && password === 'Tg2024') {
            onLogin();
            navigate('/main'); 
        } else {
            alert('Username o password errati');
        }
    };

  return (
    <div className='login-container'>
        <div className='popup-login'>
            <img className='img-login' src={logo} />

            <div className='input-box'>
                <input 
                    type='text' 
                    placeholder='Username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <i class='bx bxs-user'></i>            
            </div>

            <div className='input-box'>
                <input 
                    type='password' 
                    placeholder='Password' 
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <i class='bx bxs-lock-alt' ></i>
            </div>

            <button type='submit' className='login-btn' onClick={handleSubmit}>Accedi</button>
        </div>
    </div>
  )
}

export default Login
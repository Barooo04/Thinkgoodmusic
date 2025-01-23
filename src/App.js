import './App.css';
import Main from './Main/main'
import ComingSoon from './ComingSoon/comingSoon'
import Login from './Login/login'
import Privacy from './Privacy/privacy'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComingSoon />}/>
          <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route
            path="/main"
            element={
              isAuthenticated ? <Main /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/privacy" element={<Privacy />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

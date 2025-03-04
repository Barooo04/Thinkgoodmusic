import './App.css';
import Main from './Main/main'
import Privacy from './Privacy/privacy'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/privacy" element={<Privacy />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

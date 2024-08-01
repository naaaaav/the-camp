import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/user/Login';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    
    </div>
  );
}

export default App;

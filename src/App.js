import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';
import Login from './routes/user/Login';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

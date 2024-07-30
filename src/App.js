import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/join' element={<Join />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    
    </div>
  );
}

export default App;

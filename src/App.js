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
<<<<<<< HEAD
      
=======
>>>>>>> 75c7fe2fca64e29da31747e63644c5ec3be68812
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/payment' element={<Payment />} />
<<<<<<< HEAD
          <Route path='/join' element={<Join />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    
=======
        </Routes>
>>>>>>> 75c7fe2fca64e29da31747e63644c5ec3be68812
    </div>
  );
}

export default App;

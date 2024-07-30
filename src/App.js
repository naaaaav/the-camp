import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
    </div>
  );
}

export default App;

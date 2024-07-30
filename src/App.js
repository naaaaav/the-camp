import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';

function App() {
  return (
    <div className="App">      
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;

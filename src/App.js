import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';
import TestPayment from './routes/test/TestPayment';
import Login from './routes/user/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/payment' element={<TestPayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

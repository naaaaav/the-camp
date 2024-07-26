import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

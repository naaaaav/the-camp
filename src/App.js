import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';
import Login from './routes/user/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

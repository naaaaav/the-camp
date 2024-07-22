import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';

function App() {
  return (
    <Routes>
      <Route path='/' element= {<Home />} />
      <Route path='/test' element={<TestPage />} />
    </Routes>
  );
}

export default App;

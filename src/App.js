import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import TestPage from './routes/test/TestPage';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import AdminPage from './routes/admin/AdminPage';
import CampSettingPage from './routes/admin/CampSettingPage';
import CampListPage from './routes/campList/CampListPage';
import CampSettingDetailPage from './routes/admin/CampSettingDetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/campList' element={<CampListPage />}/>
          <Route path="/admin" element={<AdminPage />}> 
                <Route path="camp" element={<CampSettingPage />}></Route>
                <Route path="camp/:id" element={<CampSettingDetailPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

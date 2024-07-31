import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import AdminPage from './routes/admin/AdminPage';
import CampSettingPage from './routes/admin/CampSettingPage';
import CampListPage from './routes/campList/CampListPage';
import CampSettingDetailPage from './routes/admin/CampSettingDetailPage';


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:id' element={<DetailPage />} />

          <Route path='/payment' element={<Payment />} />

          <Route path='/join' element={<Join />} />
          <Route path="/profile" element={<Profile />} />

          <Route path='/campList' element={<CampListPage />}/>
          <Route path="/admin" element={<AdminPage />}> 
                <Route path="camp" element={<CampSettingPage />}></Route>
                <Route path="camp/:id" element={<CampSettingDetailPage />}></Route>
          </Route>

        </Routes>
    </div>
  );
}

export default App;

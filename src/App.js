import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import DetailPage from './routes/detail/DetailPage';
import Login from './routes/user/Login';
import './App.css'; 
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import AuthRoutes from './utils/AuthRoutes';
import UserProtectedRoutes from './utils/UserProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import Test from './routes/test/Test';
import Payment from './routes/payment/Payment';
import AdminPage from './routes/admin/AdminPage';
import CampSettingPage from './routes/admin/CampSettingPage';
import CampSettingDetailPage from './routes/admin/CampSettingDetailPage';
import ReviewCreate from './routes/review/ReviewCreate';
import ReviewList from './routes/review/ReviewList';
import ReviewCampsiteList from './routes/review/ReviewCampsiteList';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/join' element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/review/list' element={<ReviewList />} />
        <Route path='/review/list/:campsiteId' element={<ReviewCampsiteList />} />
        <Route path='/review/create/:campsiteId' element={<ReviewCreate />} />

      <Route element={<AuthRoutes />}> 
          <Route path="/user/*" element={<UserProtectedRoutes />} />
          <Route path="/admin/*" element={<AdminProtectedRoutes />} />
      </Route> 
      </Routes>
    </>
  );
};

export function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  )
}

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path="/" element={<AdminPage/>} />
        <Route path="/camp" element={<CampSettingPage/>} />
        <Route path="/camp/:id" element={<CampSettingDetailPage/>} />
      </Routes> 
    </>
  )
}

export default App;

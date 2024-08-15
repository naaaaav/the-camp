import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import DetailPage from './routes/detail/DetailPage';
import Login from './routes/user/Login';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import Payment from './routes/payment/Payment';
import AdminPage from './routes/admin/AdminPage';
import CampSettingPage from './routes/admin/CampSettingPage';
import CampSettingDetailPage from './routes/admin/CampSettingDetailPage';
import CouponCreatePage from './routes/admin/coupon/CouponCreatePage';
import CouponListPage from './routes/admin/coupon/CouponListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CampListPage from './routes/campList/CampListPage';
import ReservationPage from './routes/reservation/ReservationPage';
import AuthRoutes from './utils/AuthRoutes';
import UserProtectedRoutes from './utils/UserProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import './App.css';
import ZonePage from './routes/reservation/ZonePage';
import ThemePage from './routes/campList/ThemePage';
import ResetPasswordForm from './components/ResetPassword';
import UpdatePasswordForm from './components/UpdatePassword';
import ReviewCreate from './routes/review/ReviewCreate';
import ReviewList from './routes/review/ReviewList';
import ReviewCampsiteList from './routes/review/ReviewCampsiteList';
import ReviewUpdate from './routes/review/ReviewUpdate';

import ReservationSettingPage from './routes/admin/reservation/ReservationSettingPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* 로그인 권한 필요없는 url 세팅하는 곳입니다 */}
        <Route path='/' element={<Home />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPasswordForm />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/campList" element={<CampListPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/review/list' element={<ReviewList />} />
        <Route path='/review/list/:campsiteId' element={<ReviewCampsiteList />} />
        
        <Route element={<AuthRoutes />}>
          {/* 접속 하실때는 원래 경로에서 앞에 /user를 추가하시면 되고 
          Route는 밑에 UserRoutes()에 추가하시면 됩니다 */}
          <Route path="/user/*" element={<UserProtectedRoutes />} />
          {/* 원래 경로에서 /admin를 추가하시면 되고 
          Route는 밑에 AdminRoutes()에 추가하시면 됩니다 */}
          <Route path="/admin/*" element={<AdminProtectedRoutes />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path='/zone/:id' element={<ZonePage />} />
      <Route path='/reservation' element={<ReservationPage />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/review/update' element={<ReviewUpdate />} />
      <Route path='/review/create/:campsiteId' element={<ReviewCreate />} />
      <Route path='/update-password' element={<UpdatePasswordForm />} />
    </Routes>
  );
}

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/camp" element={<CampSettingPage />} />
      <Route path="/camp/:id" element={<CampSettingDetailPage />} />
      <Route path='/coupons' element={<CouponListPage />} />
      <Route path='/coupons/create' element={<CouponCreatePage />} />
      <Route path='/reservations' element={<ReservationSettingPage />} />
    </Routes>
  );
}

export default App;

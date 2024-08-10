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
import Header from './components/Header';
import Footer from './components/Footer';
import CampListPage from './routes/campList/CampListPage';
import ZonePage from './routes/reservation/ZonePage';
import ReservationPage from './routes/reservation/ReservationPage';
import ThemePage from './routes/campList/ThemePage';
import ResetPasswordForm from './components/ResetPassword';
import UpdatePasswordForm from './components/UpdatePassword';
import TokenRefresh from './components/TokenRefresh';

const App = () => {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/join' element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/campList" element={<CampListPage />} />
        <Route path="/theme" element={<ThemePage/>}/>
        <Route element={<AuthRoutes />}>
          <Route path="/user/*" element={<UserProtectedRoutes />} />
          <Route path="/admin/*" element={<AdminProtectedRoutes />} />
          <Route path='/zone/:id' element={<ZonePage />} />
          <Route path='/reservation' element={<ReservationPage />} />
        </Route>
      </Routes>
      <Footer />

=======
    <TokenRefresh>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/join' element={<Join />} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />
          <Route path='/update-password' element={<UpdatePasswordForm />} />
          <Route path="/theme" element={<ThemePage/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/campList" element={<CampListPage />} />
          <Route element={<AuthRoutes />}>
            <Route path="/user/*" element={<UserProtectedRoutes />} />
            <Route path="/admin/*" element={<AdminProtectedRoutes />} />
            <Route path='/reservation/:id' element={<ReservationPage />} />
          </Route>
        </Routes> 
        <Footer />
      </TokenRefresh>
      
>>>>>>> e34ec249a0fc758c6e66e3a42059d3780e474ee9
    </>
  );
};

export function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path='/payment' element={<Payment />} />
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
        <Route path="/" element={<AdminPage />} />
        <Route path="/camp" element={<CampSettingPage />} />
        <Route path="/camp/:id" element={<CampSettingDetailPage />} />

      </Routes>
    </>
  )
}

export default App;

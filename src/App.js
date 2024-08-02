import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import AuthRoutes from './utils/AuthRoutes';
import UserProtectedRoutes from './utils/UserProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import Test from './routes/test/Test';
import Test1 from './routes/test/Test1';
import Test2 from './routes/test/Test2';
import Test3 from './routes/test/Test3';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/join' element={<Join />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<AuthRoutes />}>
          <Route path="/user/*" element={<UserProtectedRoutes />} />
          <Route path="/admin/*" element={<AdminProtectedRoutes />} />
        </Route>
      </Routes>
    </>
  );
}

export function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/test1' element={<Test1 />} />
        <Route path='/test2' element={<Test2 />} />
        <Route path='/test3' element={<Test3 />} />
      </Routes>
    </>
  )
}

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/test1' element={<Test1 />} />
        <Route path='/test2' element={<Test2 />} />
        <Route path='/test3' element={<Test3 />} />
      </Routes>
    </>
  )
}

export default App;

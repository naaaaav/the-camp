import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import GuestRoutes from './utils/GuestRoutes';
import UserProtectedRoutes from './utils/UserProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';

import LayoutRoutes from './utils/LayoutRoutes';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<LayoutRoutes />}>
            <Route element={<GuestRoutes />}>
              <Route path='/' element= {<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/detail' element={<DetailPage />} />
              <Route path='/detail/:id' element={<DetailPage />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/join' element={<Join />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<UserProtectedRoutes />}>
              <Route path='/user/'>
                <Route path='test' />
                <Route path='no' />
                <Route path='yes' />
              </Route>
            </Route>
            <Route element={<AdminProtectedRoutes />}>
              <Route path='/admin/'>
                <Route path='test' />
                <Route path='no' />
                <Route path='yes' />
              </Route>
            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;

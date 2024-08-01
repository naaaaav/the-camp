import { Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { roleAtom, roleFlagAtom } from './recoil/atom/UserAtom';
import Home from './routes/Home';
import Payment from './routes/payment/Payment';
import Login from './routes/user/Login';
import DetailPage from './routes/detail/DetailPage';
import Join from './routes/user/Join';
import Profile from './routes/user/Profile';
import AuthRoutes from './utils/AuthRoutes';
import { useState } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path='/*' element={<GuestRoutes />} />
          <Route path='/user/*' element={<UserProtectedRoutes />} />
          <Route path='/admin/*' element={<AdminProtectedRoutes />} />
        </Route>
      </Routes>
    </>
  );
}

export function GuestRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/join' element={<Join />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

function UserProtectedRoutes() {
  const [role, setRole] = useRecoilState(roleAtom);
  const [roleFlag, setRoleFlag] = useRecoilState(roleFlagAtom);
  
  useState(() => {
    setRoleFlag(!roleFlag);
  }, [])

  if (role === "ROLE_GUEST") {
    return <><h1>접근권한이 없습니다.</h1></>
  }

  return (
    <>
      <Routes>
        <Route path='/test' />
      </Routes>
    </>
  )
}

function AdminProtectedRoutes() {
  const [role, setRole] = useRecoilState(roleAtom);
  const [roleFlag, setRoleFlag] = useRecoilState(roleFlagAtom);
  console.log(role);

  useState(() => {
    setRoleFlag(!roleFlag);
  }, [])

  if (role !== "ROLE_ADMIN") {
    return <><h1>접근권한이 없습니다.</h1></>
  }

  return (
    <>
      <Routes>
        <Route path='/test' />
      </Routes>
    </>
  )
}

export default App;

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { roleAtom, roleFlagAtom } from '../recoil/atom/UserAtom';
import { AdminProtectedRoutes, GuestRoutes, UserProtectedRoutes } from '../App';
import { Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useRecoilState(roleAtom);
  const [roleFlag, setRoleFlag] = useRecoilState(roleFlagAtom);
  
  useEffect(() => {
    setLoading(false);
    const authorization = localStorage.getItem('Authorization');
    
    if (!authorization) {
      setLoading(true);
      return;
    }
    
    (async () => {
      try {
        const response =  await fetch('http://localhost:8080/api/role', {
          method : 'GET',
          headers : {
            "Content-Type": "application/json",
            "Authorization" : authorization
          }
        });
      
        if (response.ok) {
          const json = await response.json();
          setRole(json.role);
          setLoading(true);
          return;          
        } else if (response.status === 401) {
          //acess 토큰 재발급
          setRole("ROLE_GUEST");
          setLoading(true);
          return;
        } else {
          setRole("ROLE_GUEST");
          setLoading(true);
          return;
        }
      } catch(error) {
        console.error(error);
      }
    })()
  }, [roleFlag])
  
  return (
    (!loading) ? <></> : 
      (role === "ROLE_GUEST") ? 
        <>
          <h1>게스트 헤더</h1>
          <Outlet />
          <h1>게스트 푸터</h1>
        </>:
      (role === "ROLE_USER") ? 
        <>
          <h1>유저 헤더</h1>
          <Outlet />
          <h1>유저 푸터</h1>
        </> :
    (role === "ROLE_ADMIN") ? 
      <>
        <h1>관리자 헤더</h1>
        <Outlet />
        <h1>관리자 푸터</h1>
      </>
    : <></>
  )
}

export default AuthRoutes;
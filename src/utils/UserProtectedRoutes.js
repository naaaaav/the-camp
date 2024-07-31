import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorRoutes from './ErrorRoutes';

const UserProtectedRoutes = () => {
  const [role, setRole] = useState(null);
  useEffect(()=>{
    const authorization = localStorage.getItem('Authorization');
    if (!authorization) return;
    (async () => {
      try {
        const response =  await fetch('http://localhost:8080/api/role', {
          method : 'GET',
          headers : {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem('Authorization')
          }
        });

        if (response.ok) {
          const json = await response.json();
          json.role === "ROLE_ADMIN" || json.role === "ROLE_USER" ? setRole(true) : setRole(false);
        } else if (response.status === 401) {
          //토큰 재발급
          setRole(false);
        } else {
          setRole(false);
        }
      } catch(error) {
        console.error(error);
      }
    })()
  }, [])
  console.log("role : " + role);
  return role === null ?  <></> : role ? <Outlet /> : <ErrorRoutes />
}

export default UserProtectedRoutes;
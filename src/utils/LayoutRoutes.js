import GuestLayout from '../routes/layout/GuestLayout';
import UserLayout from '../routes/layout/UserLayout';
import AdminLayout from '../routes/layout/AdminLayout';
import { useEffect, useState } from 'react';

const LayoutRoutes = () => {
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
            "Authorization" : authorization
          }
        });
      
        if (response.ok) {
          const json = await response.json();
          setRole(json.role);          
        } else if (response.status === 401) {
          //acess 토큰 재발급
          setRole("ROLE_GUEST");
          return;
        } else {
          setRole("ROLE_GUEST");
        }
      } catch(error) {
        console.error(error);
      }
    })()
  }, [])

  return (role === null ? <></> 
  : role === "ROLE_GUEST" ? <GuestLayout /> 
  : role === "ROLE_USER" ? <UserLayout />
  : role === "ROLE_ADMIN" ? <AdminLayout />
  : <></>
  )
}

export default LayoutRoutes;
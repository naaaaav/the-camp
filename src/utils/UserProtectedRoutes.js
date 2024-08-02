import { UserRoutes } from '../App';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roleAtom, rolePathAtom } from '../recoil/atom/UserAtom';

function UserProtectedRoutes() {
  const location = useLocation().pathname;
  const role = useRecoilValue(roleAtom);
  const setRolePath = useSetRecoilState(rolePathAtom);

  useEffect(()=>{
    if (location.includes("/user/")) {
      setRolePath(prev => location);
    }
  }, [])

  if (role === "ROLE_GUEST") {
    return <><h1>접근권한이 없습니다.</h1></>
  }

  return <UserRoutes />
}

export default UserProtectedRoutes;
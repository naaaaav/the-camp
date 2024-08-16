import { UserRoutes } from '../App'; // UserRoutes 임포트
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roleAtom, rolePathAtom } from '../recoil/atom/UserAtom';

function UserProtectedRoutes() {
  const location = useLocation().pathname;
  const role = useRecoilValue(roleAtom);
  const setRolePath = useSetRecoilState(rolePathAtom);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    if (location.includes("/user/")) {
      setRolePath(prev => location);
    }
  }, [location, setRolePath]);

  useEffect(() => {
    if (role === "ROLE_GUEST") {
      navigate('/login');
    }
  }, [role, navigate]);

  return <UserRoutes />;
}

export default UserProtectedRoutes;
export const logOut = () => {
    // 로그아웃 처리
    localStorage.removeItem('access');
  };
  
  export const isLoggedIn = () => {
    // 로그인 상태 확인 
    const access = localStorage.getItem('access');

    return !!access;
  };
  
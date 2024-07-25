export const logOut = () => {
  localStorage.removeItem('access');
  };
  
  export const isLoggedIn = () => {
    
    const access = localStorage.getItem('access');

    return !!access;
  };
  
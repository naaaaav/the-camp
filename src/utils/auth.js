export const logOut = () => {
  localStorage.removeItem('Authorization');
  };
  
  export const isLoggedIn = () => {
    
    const Authorization = localStorage.getItem('Authorization');

    return !!Authorization;
  };
  
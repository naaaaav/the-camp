import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../../components/ResetPassword';
import { useAuth } from '../../utils/AuthContext';

import Modal from '../../tools/Modal'; 
import './Login.css'; 

import apiFetch from '../../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');  // 오류 메시지를 관리하는 상태 추가
  const [showResetPassword, setShowResetPassword] = useState(false);

  const onChangeForm = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const LoginProcess = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiFetch('/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
  
      if (response.ok) {
        const Authorization = response.headers.get('Authorization');
        if (Authorization) {
          localStorage.setItem('Authorization', Authorization);
          logIn();
          alert('로그인 성공');
          navigate('/');
        } 
      }
      
    }
    catch (error) {
      
      setError('아이디 또는 비밀번호가 틀립니다.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={LoginProcess}>
          <h1>로그인</h1>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="form-input">
              <input
                type="text"
                name="email"
                className="email-input"
                value={loginForm.email}
                onChange={onChangeForm}
                placeholder="이메일을 입력해주세요"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input">
              <input
                type="password"
                name="password"
                className="password-input"
                value={loginForm.password}
                onChange={onChangeForm}
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}  
          <div className="button-group">
            <button type="submit" className="button">로그인</button>
          </div>
          <span className="text-link" onClick={() => setShowResetPassword(true)}>
            비밀번호를 잊으셨나요?
          </span>
        </form>
        <div className="signup-prompt">
          <span>아직 회원이 아니신가요? </span>
          <span className="signup-text" onClick={() => navigate('/join')}>
            회원가입
          </span>
        </div>
      </div>

      {showResetPassword && (
        <Modal onClose={() => setShowResetPassword(false)}>
          <ResetPasswordForm setShowResetPassword={setShowResetPassword} />
        </Modal>
      )}
    </div>
  );
};

export default Login;

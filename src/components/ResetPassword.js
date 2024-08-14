// components/ResetPasswordForm.js
import { useState } from 'react';
import apiFetch from '../utils/api';
import './ResetPassword.css';

const ResetPasswordForm = ({ setShowResetPassword }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!isValidEmail(email)) {
      alert('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await apiFetch('/reset-password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setMessage(response.message);

      if (response.ok){
        alert('임시 비밀번호 전송 완료');
        setShowResetPassword(false);

      }else{
        alert('임시 비밀번호 전송 실패');
      }
    } catch (err) {
      console.error('오류:', err);
      alert('해당 아이디가 존재 하지 않습니다.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="reset-email">이메일 주소:</label>
          <input
            type="email"
            id="reset-email"
            className="input-email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">임시 비밀번호 요청</button>
          <button type="button" onClick={() => setShowResetPassword(false)}>취소</button>
        </div>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordForm;

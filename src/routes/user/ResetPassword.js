import { useState } from 'react';
import './ResetPassword.css'

const ResetPasswordForm = ({ setShowResetPassword }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/reset-password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '비밀번호 재설정 요청 중 오류 발생');
      }
    } catch (err) {
      console.error('오류:', err);
      setError('비밀번호 재설정 요청 중 오류 발생');
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
            className='input-email'
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

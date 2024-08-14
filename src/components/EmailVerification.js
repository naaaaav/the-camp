import { useState } from 'react';
import './EmailVerification.css'; // Import the CSS file
import apiFetch from '../utils/api';

const EmailVerification = ({ onVerificationSuccess, onEmailChange }) => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [authCodeVerified, setAuthCodeVerified] = useState(false); // 인증 코드 확인 상태 추가
  const [error, setError] = useState('');

  const sendVerificationEmail = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }
    
    try {
      const response = await apiFetch('/mailSend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email }),
      });

      if (!response.ok) {
        throw new Error('인증 이메일 전송 실패');
      }

      const data = await response.json();
      console.log('메일 전송 응답 데이터:', data);

      if (data.success) {
        alert('인증 이메일이 전송되었습니다.');
        setIsEmailSent(true);
        setError('');
        onEmailChange(email); 
      } else {
        alert('이메일 전송에 실패했습니다.');
        setError(data.error || '이메일 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      alert('이메일을 입력하세요');
      setError('이메일을 입력하세요');
    }
  };

  const checkAuthCode = async () => {
    try {
        const response = await apiFetch('/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, authNumber: authCode }),
        });

        if (!response.ok) {
            throw new Error('인증 코드 확인 실패');
        }

        const data = await response.json();

        if (data.success) {
            alert('인증 성공');
            setAuthCodeVerified(true); // 인증 성공 시 상태 업데이트
            onVerificationSuccess();
            setError('');
        } else {
            alert(data.message || '인증 코드가 일치하지 않습니다.');
            setError(data.message || '인증 코드가 일치하지 않습니다.');
        }
    } catch (error) {
      if (error.message === "400") {
        alert('숫자 형식이 아닙니다.');
        setError('숫자 형식이 아닙니다.');
        return;
      }

      if (error.message === "403") {
        alert('인증 코드가 만료되었습니다.');
        setError('인증 코드가 만료되었습니다.');
        return;
      }

      if (error.message === "500") {
        alert('인증 코드가 틀립니다.');
        setError('인증 코드가 틀립니다.');
        return;
      }
    }
  };

  return (
    <div className="EmailVerification">
      <div className="input-container">
        <input
          type="email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          required
        />
        <button
          type="button"
          className="send-button"
          onClick={sendVerificationEmail}
        >
          인증 이메일 전송
        </button>
      </div>
      
      {isEmailSent && !authCodeVerified && ( // 인증 성공 전까지만 인증 코드 입력창 표시
        <>
          <div className="verify-label">인증 코드</div>
          <div className="auth-code-container">
            <input
              type="text"
              className="auth-code-input"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="인증 코드를 입력해주세요"
              required
            />
            <button
              type="button"
              className="verify-button"
              onClick={checkAuthCode}
            >
              인증 코드 확인
            </button>
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EmailVerification;

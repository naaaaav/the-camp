import { useState } from 'react';

const EmailVerification = ({ onVerificationSuccess, onEmailChange }) => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('http://localhost:8080/mailSend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email }), // RequestParam에 맞춰 'mail'을 'email'로 변경
      });

      const data = await response.json();
      console.log('Mail send response data:', data);

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
      alert('서버 오류입니다.');
      setError('서버 오류입니다.');
    }
  };

  const checkAuthCode = async () => {
    try {
      const response = await fetch('http://localhost:8080/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, authNumber: authCode }), // 서버로 email과 authNumber를 전송
      });

      const data = await response.json();
      console.log('Verify code response data:', data);

      if (data.success) {
        alert('인증 성공');
        onVerificationSuccess(); 
        setError('');
      } else {
        alert(data.message || '인증 코드가 일치하지 않습니다.');
        setError(data.message || '인증 코드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('인증 코드 확인 중 오류 발생:', error);
      alert('서버 오류입니다.');
      setError('서버 오류입니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <button type="button" onClick={sendVerificationEmail}>
        인증 이메일 전송
      </button>
      <br />
      {isEmailSent && (
        <>
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="인증 코드"
          />
          <button type="button" onClick={checkAuthCode}>
            인증 코드 확인
          </button>
        </>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default EmailVerification;

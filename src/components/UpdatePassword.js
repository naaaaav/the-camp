import React, { useState } from 'react';
import './UpdatePassword.css'; 

const UpdatePasswordForm = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '비밀번호 변경 중 오류 발생');
      }
    } catch (err) {
      setError('비밀번호 변경 중 오류 발생');
    }
  };

  return (
    <div className="update-password-container">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleUpdatePassword}>
        <div className="form-group">
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            placeholder="현재 비밀번호를 입력 해주세요"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            placeholder="변경 할 비밀번호를 입력 해주세요"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">비밀번호 변경</button>
          <button type="button" onClick={onClose}>취소</button>
        </div>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdatePasswordForm;

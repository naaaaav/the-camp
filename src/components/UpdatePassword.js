// components/UpdatePasswordForm.js
import React, { useState } from 'react';
import apiFetch from '../utils/api';
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


    if (newPassword.length < 8) {
      alert('새 비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await apiFetch('/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        onClose();


      } else {
        const errorData = await response.json();
        setError(errorData.message || '비밀번호 변경 중 오류 발생');
      }
    } catch (err) {
      // 오류 처리
      alert('현재 사용중인 비밀번호가 틀립니다.');
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

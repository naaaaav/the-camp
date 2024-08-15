import React, { useState } from 'react';
import EmailVerification from './EmailVerification';
import Modal from '../../tools/Modal';
import apiFetch from '../../utils/api';
import './DeleteUser.css'; // Import the CSS file

const DeleteUser = ({ onClose }) => {
  const [showEmailVerification, setShowEmailVerification] = useState(true);
  const [email, setEmail] = useState('');
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  const handleVerificationSuccess = () => {
    // 사용자 인증 성공 후 계정 삭제 API 호출
    deleteAccount();
  };

  const handleEmailChange = (email) => {
    setEmail(email); // 이메일 주소 저장
  };

  const deleteAccount = async () => {
    try {
      const response = await apiFetch('/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('계정 삭제 실패');
      }

      const data = await response.json();

      if (data.success) {
        alert('계정이 성공적으로 삭제되었습니다.');
        setIsAccountDeleted(true);
        onClose(); // 모달 닫기
      } else {
        alert('계정 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('계정 삭제 중 오류 발생:', error);
      alert('계정 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal onClose={onClose}>
      {isAccountDeleted ? (
        <div className="confirmation-message">
          <h3>계정이 성공적으로 삭제되었습니다.</h3>
        </div>
      ) : (
        <div className="delete-user-container">
          {showEmailVerification ? (
            <EmailVerification
              onVerificationSuccess={handleVerificationSuccess}
              onEmailChange={handleEmailChange}
            />
          ) : (
            <div className="confirmation-message">
              <h3>계정 삭제를 위한 이메일 인증이 완료되었습니다.</h3>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default DeleteUser;

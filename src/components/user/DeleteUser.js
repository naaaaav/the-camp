import React from 'react';
import Modal from '../../tools/Modal';
import apiFetch from '../../utils/api';
import { useAuth } from '../../utils/AuthContext';
import './DeleteUser.css';

const DeleteUser = ({ onClose }) => {
  const { logOut } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      
      if (!token) {
        logOut();
        window.location.href = '/login';
        return;
      }

      const response = await apiFetch('/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      logOut();
      localStorage.removeItem('Authorization')
      window.location.href = '/login'; 
    } catch (err) {
      console.error('Failed to delete account:', err.message);
      alert('Error deleting account: ' + err.message); 
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="confirmation-modal">
        <h1>정말로 삭제 하시겠습니까? </h1>
        <p>
          계정을 삭제하시게 되면 더캠프 사이트를 이용하실 수 없게 됩니다.
        </p>
        <button onClick={handleDeleteAccount} className="confirm-button">확인</button>
        <button onClick={onClose} className="cancel-button">취소</button>
      </div>
    </Modal>
  );
};

export default DeleteUser;

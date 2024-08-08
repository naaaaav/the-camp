import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailVerification from './../../components/EmailVerification';

import './Join.css';

import apiFetch from '../../utils/api';


const Join = () => {
  const navigate = useNavigate();
  const [joinForm, setJoinForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    birthday: '',
    phoneNumber: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const setEmail = (email) => {
    setJoinForm((prev) => ({
      ...prev,
      email,
    }));
  };

  const onChangeForm = (e) => {
    setJoinForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '', 
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!joinForm.email) newErrors.email = '이메일을 입력하세요';
    if (!joinForm.password) newErrors.password = '비밀번호를 입력하세요';
    if (joinForm.password !== joinForm.passwordConfirmation) newErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다';
    if (!joinForm.name) newErrors.name = '이름을 입력하세요';
    if (!joinForm.birthday) newErrors.birthday = '생년월일을 입력하세요';
    if (!joinForm.phoneNumber) newErrors.phoneNumber = '전화번호를 입력하세요';
    if (!joinForm.gender) newErrors.gender = '성별을 입력하세요';
    return newErrors;
  };

  const joinProcess = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isEmailVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }

    try {
      const response = await apiFetch('/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinForm),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        alert('회원가입 성공');
        navigate('/login');
      } else if (response.status === 500) {
        alert('이미 가입된 이메일이 존재합니다.');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="Group11">
      <h1>회원가입</h1>
      <form>
        <EmailVerification
          onVerificationSuccess={() => setIsEmailVerified(true)}
          onEmailChange={setEmail}
        />
        <div className="form-field">
          <input
            type="email"
            name="email"
            value={joinForm.email}
            onChange={onChangeForm}
            placeholder="이메일"
            disabled={!isEmailVerified} 
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-field">
          <input
            type="password"
            name="password"
            value={joinForm.password}
            onChange={onChangeForm}
            placeholder="비밀번호"
            disabled={!isEmailVerified} 
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div className="form-field">
          <input
            type="password"
            name="passwordConfirmation"
            value={joinForm.passwordConfirmation}
            onChange={onChangeForm}
            placeholder="비밀번호 확인"
            disabled={!isEmailVerified} 
          />
          {errors.passwordConfirmation && <div className="error-message">{errors.passwordConfirmation}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="name"
            value={joinForm.name}
            onChange={onChangeForm}
            placeholder="이름"
            disabled={!isEmailVerified} 
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-field">
          <input
            type="date"
            name="birthday"
            value={joinForm.birthday}
            onChange={onChangeForm}
            placeholder="생년월일"
            disabled={!isEmailVerified}
          />
          {errors.birthday && <div className="error-message">{errors.birthday}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="phoneNumber"
            value={joinForm.phoneNumber}
            onChange={onChangeForm}
            placeholder="전화번호"
            disabled={!isEmailVerified} 
          />
          {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="gender"
            value={joinForm.gender}
            onChange={onChangeForm}
            placeholder="성별"
            disabled={!isEmailVerified} 
          />
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
        <div className="ButtonGroup">
          <div className="Button">
            <button className="button-text" onClick={joinProcess} disabled={!isEmailVerified}>회원가입</button>
          </div>
          <div className="Button">
            <button className="button-text" onClick={(e) => { e.preventDefault(); navigate('/'); }}>메인</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Join;

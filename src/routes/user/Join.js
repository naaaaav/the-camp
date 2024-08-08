import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailVerification from './../../components/EmailVerification';
import apiFetch from '../../utils/api';

const Join = () => {
  const navigate = useNavigate();
  const [joinForm, setJoinForm] = useState({
    email: '',
    password: '',
    name: '',
    birthday: '',
    phoneNumber: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 이메일 저장
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
        alert('이미 가입된 이메일이 존재 합니다.');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <EmailVerification
          onVerificationSuccess={() => setIsEmailVerified(true)}
          onEmailChange={setEmail} // 이메일 전달
        />
        <input
          type="password"
          name="password"
          value={joinForm.password}
          onChange={onChangeForm}
          placeholder="비밀번호"
          disabled={!isEmailVerified} 
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        <br />
        <input
          type="text"
          name="name"
          value={joinForm.name}
          onChange={onChangeForm}
          placeholder="이름"
          disabled={!isEmailVerified} 
        />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        <br />
        <input
          type="date"
          name="birthday"
          value={joinForm.birthday}
          onChange={onChangeForm}
          placeholder="생년월일"
          disabled={!isEmailVerified}
        />
        {errors.birthday && <div style={{ color: 'red' }}>{errors.birthday}</div>}
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={joinForm.phoneNumber}
          onChange={onChangeForm}
          placeholder="전화번호"
          disabled={!isEmailVerified} 
        />
        {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
        <br />
        <input
          type="text"
          name="gender"
          value={joinForm.gender}
          onChange={onChangeForm}
          placeholder="성별"
          disabled={!isEmailVerified} 
        />
        {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
        <br />
        <button onClick={joinProcess} disabled={!isEmailVerified}>회원가입</button>
        <button onClick={(e) => navigate('/')}>메인</button>
      </form>
    </div>
  );
};

export default Join;

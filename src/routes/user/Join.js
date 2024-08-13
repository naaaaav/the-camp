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



    // 비밀번호 검증
    if (!joinForm.password) newErrors.password = '비밀번호를 입력하세요';
    else if (joinForm.password.length < 8) newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';

    // 비밀번호 확인 검증
    if (joinForm.password !== joinForm.passwordConfirmation) newErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다';

    // 이름 검증
    if (!joinForm.name) newErrors.name = '이름을 입력하세요';
    else if (/[^a-zA-Z가-힣]/.test(joinForm.name)) newErrors.name = '이름은 한글 또는 영어만 포함할 수 있습니다';

    // 생년월일 검증
    if (!joinForm.birthday) newErrors.birthday = '생년월일을 입력하세요';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(joinForm.birthday)) newErrors.birthday = '유효한 날짜 형식(YYYY-MM-DD)을 입력하세요';

    // 전화번호 검증
    if (!joinForm.phoneNumber) newErrors.phoneNumber = '전화번호를 입력하세요';
    else if (!/^\d{10,11}$/.test(joinForm.phoneNumber)) newErrors.phoneNumber = '유효한 전화번호를 입력하세요';



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
      } else if (response.status === 409) {
        setErrors({ email: '이미 가입된 이메일이 존재합니다.' });
      } else if (response.status === 400) {
        setErrors({ form: '잘못된 요청입니다. 입력값을 확인하세요.' });
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
        <div className="form-field">
          <label className="field-label">Email</label>
          <EmailVerification
            onVerificationSuccess={() => setIsEmailVerified(true)}
            onEmailChange={setEmail}
      
          />
        </div>
        <div className="form-field">
          <label className="field-label">Password</label>
          <input
            type="password"
            name="password"
            value={joinForm.password}
            onChange={onChangeForm}
            placeholder="비밀번호를 입력해주세요"
            disabled={!isEmailVerified} 
            required
          />
          {errors.password && <div className="error-message">alert({errors.password})</div>}
        </div>
        <div className="form-field">
          <label className="field-label">Password Check</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={joinForm.passwordConfirmation}
            onChange={onChangeForm}
            placeholder="비밀번호 확인"
            disabled={!isEmailVerified} 
            required
          />
          {errors.passwordConfirmation && <div className="error-message">{errors.passwordConfirmation}</div>}
        </div>
        <div className="form-field">
          <label className="field-label">NickName</label>
          <input
            type="text"
            name="name"
            value={joinForm.name}
            onChange={onChangeForm}
            placeholder="닉네임을 입력해주세요"
            disabled={!isEmailVerified} 
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-field">
          <label className="field-label">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={joinForm.birthday}
            onChange={onChangeForm}
            placeholder="생년월일"
            disabled={!isEmailVerified}
            required
          />
          {errors.birthday && <div className="error-message">{errors.birthday}</div>}
        </div>
        <div className="form-field">
          <label className="field-label">PhoneNumber</label>
          <input
            type="text"
            name="phoneNumber"
            value={joinForm.phoneNumber}
            onChange={onChangeForm}
            placeholder="전화번호 ( &quot;-&quot; 없이 입력해주세요)"
            disabled={!isEmailVerified} 
            required
          />
          {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>
        <div className="form-field">
          <label className="field-label">Gender</label>
          <select
            type="text"
            name="gender"
            value={joinForm.gender}
            onChange={onChangeForm}
            disabled={!isEmailVerified} 
            required
          >
            <option value="">성별을 선택하세요</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
        <div className="ButtonGroup">
          <button className="Join-Button" onClick={joinProcess} disabled={!isEmailVerified}>회원가입</button>
          <button className="Main-Button" onClick={(e) => { e.preventDefault(); navigate('/'); }}>메인</button>
        </div>
      </form>
    </div>
  );
};

export default Join;

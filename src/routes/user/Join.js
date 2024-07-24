import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const onChangeForm = (e) => {
    setJoinForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const joinProcess = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinForm),
    });

    if (response.status === 200) {
      alert('회원가입 성공');
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <input
          type="text"
          name="email"
          value={joinForm.email}
          onChange={onChangeForm}
          placeholder="이메일"
        />
        <br />
        <input
          type="password"
          name="password"
          value={joinForm.password}
          onChange={onChangeForm}
          placeholder="비밀번호"
        />
        <br />
        <input
          type="text"
          name="name"
          value={joinForm.name}
          onChange={onChangeForm}
          placeholder="이름"
        />
        <br />
        <input
          type="date"
          name="birthday"
          value={joinForm.birthday}
          onChange={onChangeForm}
          placeholder="생년월일"
        />
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={joinForm.phoneNumber}
          onChange={onChangeForm}
          placeholder="전화번호"
        />
        <br />
        <input
          type="text"
          name="gender"
          value={joinForm.gender}
          onChange={onChangeForm}
          placeholder="성별"
        />
        <br />
        <button onClick={joinProcess}>회원가입</button>
        <button onClick={(e) => navigate('/')}>메인</button>
      </form>
    </div>
  );
};

export default Join;

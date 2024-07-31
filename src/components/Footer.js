import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-logo">
        <span>더캠프</span>
      </div>
      <div className="footer-links">
        <span>개인정보취급방침</span>
        <span>홈페이지 이용약관</span>
        <span>광고 및 제휴문의</span>
        <span>고객센터</span>
        {/* <button className="footer-button" onClick={() => handleNavClick('/signup')}>회원가입</button> */}
        <button className="footer-button" onClick={() => handleNavClick('/login')}>로그인</button>
      </div>
      <div className="footer-info">
        <p>주식회사 더캠프 | 대표이사: 엘리스 | 사업자등록번호: 123-45-67890</p>
        <p>주소: 엘리스 (성수동, 성수낙낙)</p>
        <p>국내 여행업: 2021-00000018 </p>
        <p>대표전화: 02-222-2222 | 고객센터: 070-2222-2222 | 팩스: 0504-205-0826 | 이메일: elice@naver.com</p>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2024 www.elice.com. All Rights Reserved. with CooP.</p>
      </div>
    </footer>
  );
};

export default Footer;

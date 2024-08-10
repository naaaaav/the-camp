import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import styles from "../../styles/reservation/ReservationPage.module.css";
import { adultsState, childrenState, startDateState, endDateState, daysState, datesSelectedState, sitesState, zoneState, selectedSiteState } from "../../recoil/atom/ReservationAtom";
import { useNavigate } from 'react-router-dom';

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};

const ReservationPage = () => {
    const [adults, setAdults] = useRecoilState(adultsState);
    const [children, setChildren] = useRecoilState(childrenState);
    const startDate = useRecoilValue(startDateState);
    const endDate = useRecoilValue(endDateState);
    const days = useRecoilValue(daysState);
    const datesSelected = useRecoilValue(datesSelectedState);
    const sites = useRecoilValue(sitesState);
    const zone = useRecoilValue(zoneState);
    const selectedSite = useRecoilValue(selectedSiteState);
    const navigate = useNavigate();

    const totalGuests = adults + children;

    const handleIncrease = (setter, value) => {
        if (totalGuests < 6) {
            setter(value + 1);
        } else {
            alert("총 인원은 6명을 초과할 수 없습니다.");
        }
    };

    const handleDecrease = (setter, value) => {
        if (setter === setAdults && value === 1) {
            alert("성인은 1명 이상이어야 합니다.");
        } else if (value > 0) {
            setter(value - 1);
        }
    };

    //인원이 front에서 받은 것과 일치한지 검증(백엔드)

    const navigatePaymentPage = () => {
        navigate('/payment');
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.zoneInfo}>
                    <img src={zone.campSiteImg} alt={zone.campSiteName} className={styles.campImage} />
                    <div>
                        <h2>{zone.campSiteName}</h2>
                        <p>{zone.title} • {selectedSite.title}</p>
                        <p>기준인원: 성인 2명, 미성년 2명</p>
                        <p>기준차량: 1대</p>
                    </div>
                </div>
                <div className={styles.dateInfo}>
                    <div>
                        <h4>체크인</h4>
                        <p>{startDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })} {formatTime(zone.checkin)}</p>
                    </div>
                    <div>
                        {days}박
                    </div>
                    <div>
                        <h4>체크아웃</h4>
                        <p>{endDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })} {formatTime(zone.checkout)}</p>
                    </div>
                </div>
                <h3>전체 인원 정보</h3>
                <div className={styles.counter}>
                    <span>성인</span>
                    <button onClick={() => handleDecrease(setAdults, adults)}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => handleIncrease(setAdults, adults)}>+</button>
                </div>
                <div className={styles.counter}>
                    <span>청소년 (18세 미만)</span>
                    <button onClick={() => handleDecrease(setChildren, children)}>-</button>
                    <span>{children}</span>
                    <button onClick={() => handleIncrease(setChildren, children)}>+</button>
                </div>
                <div className={styles.infoBox}>
                    <div>기준인원: 성인 2명, 미성년 2명</div>
                    <div>총 인원 제한: 6명</div>
                </div>
                <button className={styles.submitButton} onClick={navigatePaymentPage}>{days}박{days + 1}일 · 성인 {adults}명 미성년 {children}명 예약하기</button>
            </div>
        </div>
    )
};

export default ReservationPage;

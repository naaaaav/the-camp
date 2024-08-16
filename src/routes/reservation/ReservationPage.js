import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from "../../styles/reservation/ReservationPage.module.css";
import { adultsState, childrenState } from "../../recoil/atom/ReservationAtom";

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};

const calculateTotalPrice = (start, end, pricePerDay, adults) => {
    if (!start || !end || !pricePerDay) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);

    let price = days * pricePerDay;

    if (adults > 2) {
        price += (adults - 2) * 10000;
    }

    return price;
};



const ReservationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [adults, setAdults] = useRecoilState(adultsState);
    const [children, setChildren] = useRecoilState(childrenState);
    const { state } = location;

    const totalGuests = adults + children;
    const totalPrice = calculateTotalPrice(state.startDate, state.endDate, state.pricePerDay, adults);

    console.log(state);

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

    console.log(state.zone.title);
    console.log("selec : ", state.site.title);
    console.log("start : ", state.startDate);

    const sendToPayment = () => {
        console.log(state.selectedSite);
        const data = {
            campSiteName: state.zone.campSiteName,
            totalPrice: totalPrice,
            // campsiteSeq: id, //id가 camsiteSeq가 맞나요? -> campsiteSeq는 reservation에 필요 없습니다.
            siteSeq: state.site.seq, //siteSeq를 어디서 가져와야할지 잘 모르겠습니다...
            reserveStartDate: state.startDate,
            reserveEndDate: state.endDate,
            adults: adults,
            children: children,
        }
        navigate('/user/payment', { state: data });
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.zoneInfo}>
                    <img src={state.zone.campSiteImg} alt={state.zone.campSiteName} className={styles.campImage} />
                    <div>
                        <h2>{state.zone.campSiteName}</h2>
                        <p>{state.zone.title} • {state.site.title}</p>
                        <p>기준인원: 성인 2명, 미성년 2명</p>
                        <p>기준차량: 1대</p>
                    </div>
                </div>
                <div className={styles.dateInfo}>
                    <div>
                        <h4>체크인</h4>
                        <p>{state.startDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })} {formatTime(state.zone.checkin)}</p>
                    </div>
                    <div>
                        {state.days}박
                    </div>
                    <div>
                        <h4>체크아웃</h4>
                        <p>{state.endDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })} {formatTime(state.zone.checkout)}</p>
                    </div>
                </div>
                <h3>전체 인원 정보</h3>
                <div className={styles.counter}>
                    <span>성인</span>
                    <div className={styles['counter-controls']}>
                        <button onClick={() => handleDecrease(setAdults, adults)}>-</button>
                        <span>{adults}</span>
                        <button onClick={() => handleIncrease(setAdults, adults)}>+</button>
                    </div>
                </div>
                <div className={styles.counter}>
                    <span>청소년 (18세 미만)</span>
                    <div className={styles['counter-controls']}>
                        <button onClick={() => handleDecrease(setChildren, children)}>-</button>
                        <span>{children}</span>
                        <button onClick={() => handleIncrease(setChildren, children)}>+</button>
                    </div>
                </div>


                <div className={styles.infoBox}>
                    <div>기준인원: 성인 2명, 미성년 2명</div>
                    <div>총 인원 제한: 6명</div>
                </div>
                <button className={styles.submitButton} onClick={sendToPayment}>{state.days}박{state.days + 1}일 · 성인 {adults}명 미성년 {children}명 예약하기</button>
            </div>
        </div>
    )
};

export default ReservationPage;

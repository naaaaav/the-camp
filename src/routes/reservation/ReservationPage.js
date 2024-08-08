import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Calendar from './../../components/Calendar';
import styles from "../../styles/reservation/ReservationPage.module.css";
import { getZoneByZoneSeq } from '../../tools/ZoneFunctions';
import { getSiteByZone } from '../../tools/SiteFunctions';

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};

const calculateTotalPrice = (start, end, pricePerDay) => {
    if (!start || !end || !pricePerDay) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return days * pricePerDay;
};

const ReservationPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [days, setDays] = useState(null);
    const [datesSelected, setDatesSelected] = useState(false);
    const [sites, setSites] = useState([]);
    const [zone, setZone] = useState(null);
    const [selectedSite, setSelectedSite] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sitesResult = await getSiteByZone(id);
                if (sitesResult) {
                    setSites(sitesResult);
                }

                const zoneResult = await getZoneByZoneSeq(id);
                if (zoneResult) {
                    setZone(zoneResult);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleIncrease = (setter, value) => setter(value + 1);
    const handleDecrease = (setter, value) => value > 1 && setter(value - 1);

    const handleDatesSelected = (start, end) => {
        if (start && end) {
            setStartDate(start);
            setEndDate(end);
            setDatesSelected(true);
            const startDate = new Date(start);
            const endDate = new Date(end);
            const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
            setDays(days);
        } else {
            setDatesSelected(false);
            setDays(null);
        }
    };

    const handleSiteClick = (site) => {
        setSelectedSite(site);
        console.log(site);
    };

    const totalPrice = zone ? calculateTotalPrice(startDate, endDate, zone.offSeasonPrice) : 0;
    console.log(startDate, endDate);
    console.log(totalPrice);

    const sendToPayment = () => {
        const data = {
            campSiteName : zone.campSiteName,
            totalPrice : totalPrice,
            campsiteSeq : id, //id가 camsiteSeq가 맞나요?
            siteSeq : selectedSite, //siteSeq를 어디서 가져와야할지 잘 모르겠습니다...
            reserveStartDate : startDate,
            reserveEndDate : endDate,
            adults : adults,
            children : children,
        }
        navigate('/user/payment', {state : data});
    }

    return (
        <div className={styles.reservationPage}>
            <div className={styles.content}>
                {zone && (
                    <>
                        <img src={zone.campSiteImg} alt="캠핑장 이미지" className={styles.mainImage} />
                        <h1>{zone.campSiteName}</h1>
                        <h2>{zone.title}</h2>
                        <h3>캠핑존 소개</h3>
                        <p>{zone.intro}</p>
                        <h3>캠핑존 세부 정보</h3>
                        <p>체크인·체크아웃 {formatTime(zone.checkin)} ~ {formatTime(zone.checkout)}</p>
                        <p>비성수기 가격: {zone.offSeasonPrice}</p>
                        <p>성수기 가격: {zone.peakSeasonPrice}</p>
                        <p>극성수기 가격: {zone.bestPeakSeasonPrice}</p>
                    </>
                )}
                <div className={styles.map}>
                    <h3>배치도</h3>
                    {/* <img src="https://your-map-url.com" alt="배치도" /> */}
                </div>
                <h2>예약안내</h2>
                <div className={styles.selection}>
                    <div className={styles.calendar}>
                        <Calendar isAdmin={false} onDatesSelected={handleDatesSelected} />
                    </div>
                </div>
                {datesSelected && (
                    <>
                        <div className={styles.gallerySelection}>
                            <div className={styles.dateSelection}>
                                <h3>날짜 및 인원 선택</h3>
                                <div className={styles.counter}>
                                    <span>성인</span>
                                    <button onClick={() => handleDecrease(setAdults, adults)}>-</button>
                                    <span>{adults}</span>
                                    <button onClick={() => handleIncrease(setAdults, adults)}>+</button>
                                </div>
                                <div className={styles.counter}>
                                    <span>소인 (18세 미만)</span>
                                    <button onClick={() => handleDecrease(setChildren, children)}>-</button>
                                    <span>{children}</span>
                                    <button onClick={() => handleIncrease(setChildren, children)}>+</button>
                                </div>
                            </div>
                            <h3>사이트 선택</h3>
                            <div className={styles.buttonContainer}>
                                {sites.map(site => (
                                    <button
                                        key={site.id}
                                        onClick={() => handleSiteClick(site)}
                                        className={`${styles.siteButton} ${selectedSite === site ? styles.active : ''}`}
                                    >
                                        {site.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.info}>
                            <h3>안내사항</h3>
                            <ul>
                                <li>성인 예약 가능...</li>
                                <li>취소 및 변경 불가...</li>
                            </ul>
                        </div>
                        <div className={styles.price}>
                            {startDate && endDate && (
                                <>
                                    <p>{(startDate).toLocaleDateString()} ~ {(endDate).toLocaleDateString()}</p>
                                    <p>총 {totalPrice} 원 / {days}박</p>
                                </>
                            )}
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.couponButton}>쿠폰 적용하기</button>
                            <button
                                className={styles.paymentButton}
                                onClick={sendToPayment}
                            >
                                결제하기
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReservationPage;

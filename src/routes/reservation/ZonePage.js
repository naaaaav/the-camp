import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from './../../components/Calendar';
import styles from "../../styles/reservation/ZonePage.module.css";
import { getZoneByZoneSeq } from '../../tools/ZoneFunctions';
import { getSiteByZone } from '../../tools/SiteFunctions';
import { getReservationExistence } from '../../tools/ReservationFunctions';
import { adultsState, childrenState, startDateState, endDateState, daysState, datesSelectedState, sitesState, zoneState, selectedSiteState } from '../../recoil/atom/ReservationAtom';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";

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

const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const ZonePage = () => {
    const { id } = useParams();
    const [adults, setAdults] = useRecoilState(adultsState);
    const [children, setChildren] = useRecoilState(childrenState);
    const [startDate, setStartDate] = useRecoilState(startDateState);
    const [endDate, setEndDate] = useRecoilState(endDateState);
    const [days, setDays] = useRecoilState(daysState);
    const [datesSelected, setDatesSelected] = useState(false);
    const [sites, setSites] = useState([]);
    const [zone, setZone] = useRecoilState(zoneState);
    const [selectedSite, setSelectedSite] = useRecoilState(selectedSiteState);
    const [siteStatus, setSiteStatus] = useState([]);
    const navigate = useNavigate();

    const totalGuests = adults + children;

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

    useEffect(() => {
        const checkReservations = async () => {
            if (startDate && endDate) {
                console.log("start : ", startDate);
                console.log("end : ", endDate);

                const formattedStartDate = formatDateToYYYYMMDD(startDate);
                const formattedEndDate = formatDateToYYYYMMDD(endDate);

                console.log("Formatted Start Date:", formattedStartDate);
                console.log("Formatted End Date:", formattedEndDate);

                const statusPromises = sites.map(site =>
                    getReservationExistence({
                        siteSeq: site.seq,
                        reservationStartDate: formattedStartDate,
                        reservationEndDate: formattedEndDate
                    })
                );
                const statusResults = await Promise.all(statusPromises);
                //Promise.allSettled
                setSiteStatus(statusResults.map(result => result.data.existence));

                console.log(statusResults.map(result => result.data.existence));
                console.log(statusResults.map(result => result.existence));
            }
        };

        checkReservations();
    }, [startDate, endDate, sites]);

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

    const handleDatesSelected = (start, end) => {
        if (start && end) {
            setStartDate(start);
            setEndDate(end);
            setDatesSelected(true);
            setSelectedSite(null);
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

    const navigateReservationPage = () => {
        navigate('/reservation');
    };

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
                                {sites.map((site, index) => (
                                    <button
                                        key={site.id}
                                        onClick={() => handleSiteClick(site)}
                                        className={`${styles.siteButton} ${selectedSite === site ? styles.active : ''}`}
                                        disabled={siteStatus[index] === true} // 상태에 따라 버튼 비활성화
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
                            <button className={styles.paymentButton} onClick={navigateReservationPage}>예약하기</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ZonePage;

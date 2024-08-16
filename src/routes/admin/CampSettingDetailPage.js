import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleBox from "../../components/detail/TitleBox";
import styles from '../../styles/admin/campSettingDetailPage.module.css';
import apiFetch from "../../utils/api";



function CampSettingDetailPage() {

    const { id } = useParams();

    const [camp, setCamp] = useState({});
    // const [zones,setZones] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [seasonInput, setSeasonInput] = useState({
        seq: '',
        start: '',
        end: '',
        type: '',
        campsite: id
    });

    const [inputs, setInputs] = useState({
        title: '',
        intro: '',
        checkin: '',
        checkout: '',
        offSeasonPrice: '',
        peakSeasonPrice: '',
        bestPeakSeasonPrice: '',
        maxNight: '',
        numOfSite: 0
    });

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    useEffect(() => {

        apiFetch("/campsite/zone/site/" + id, {
            method: 'GET',
        }).then((res) => res.json())
            .then(data => {
                setCamp(data);

            });


        apiFetch("/season/campsiteSeq/" + id, {
            method: 'GET'
        }).then((res) => res.json())
            .then(data => {
                
                setSeasons(data);
            })

    }, [id]);

    const deleteZone = (seq) => {
        apiFetch("/zone/" + seq, {
            method: 'DELETE',
        }).then((res) => {
            return res.json();
        })
            .then(data => {
                
                setCamp(prev => ({
                    ...prev,
                    zones: prev.zones.filter(item => item.seq !== data)
                }));
            })
    }

    const deleteSeason = (seq) => {
        apiFetch("/season/" + seq, {
            method: 'DELETE',
        }).then((res) => res.json())
            .then(data => {
                setSeasons(prevData => prevData.filter(item => item.seq !== data))
                
            })
    }


    const onStartChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            start: e.target.value
        })

    }

    const onEndChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            end: e.target.value
        })

    }

    const onTypeChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            type: e.target.value
        })
        
    }

    const insertSeason = (e) => {

        const start = new Date(seasonInput.start);
        const end = new Date(seasonInput.end);

        if (start > end) {
            alert('시작일은 종료일보다 작아야 합니다.');
            return;
        }

        apiFetch("/season", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization')
            },
            body: JSON.stringify({
                ...seasonInput,
            })
        }).then(res =>
            res.json()

        )
            .then(data => {

                
                setSeasons(prevData => [...prevData, data]);
               
            }
            ).catch(err => {
                
                alert(err.message);
            })
    }

    return (
        <div>
            <h1>{camp.facltNm}</h1>
            <div>
                <h1>구역 목록</h1>
                <div id="zoneBox">

                    {
                        camp?.zones?.map(
                            (item, i) =>

                                <div className={styles.zoneContainer} key={i}>
                                    <h1>{item.title}</h1>
                                    <div>
                                        구역 소개: {item.intro}
                                    </div>
                                    <div>
                                        체크인: {item.checkin}
                                        체크아웃: {item.checkout}
                                    </div>
                                    <div>
                                        비수기 가격: {item.offSeasonPrice}
                                        성수기 가격: {item.peakSeasonPrice}
                                        극 성수기 가격: {item.bestPeakSeasonPrice}
                                    </div>
                                    <div className={styles.siteContainer}>
                                        구획 수: {item?.sites?.length}
                                    </div>
                                    <div class={styles.siteContainer}>
                                        최대 숙박 기간 : {item.maxNight}
                                    </div>
                                    <button onClick={() => deleteZone(item.seq)}>삭제</button>
                                </div>

                        )
                    }

                    <table>

                        <thead>
                            <tr>
                                <th>구역 이름</th>
                                <th>한줄 소개</th>
                                <th>체크인 시간</th>
                                <th>체크아웃 시간</th>
                                <th>비수기 가격</th>
                                <th>성수기 가격</th>
                                <th>극성수기 가격</th>
                                <th>구획 수</th>
                                <th>최대 숙박 기간</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><input type="text" name="title" onChange={onChange}></input></td>
                                <td><input type="text" name="intro" onChange={onChange}></input></td>
                                <td><input type="time" name="checkin" onChange={onChange}></input></td>
                                <td><input type="time" name="checkout" onChange={onChange}></input></td>
                                <td><input type="number" name="offSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="peakSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="bestPeakSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="numOfSite" onChange={onChange}></input></td>
                                <td><input type="number" name="maxNight" onChange={onChange}></input></td>
                            </tr>
                        </tbody>

                    </table>
                    <button onClick={() => {
                        apiFetch("/zone", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('Authorization')
                            },
                            body: JSON.stringify({
                                ...inputs,
                                campSite: id
                            })
                        })
                            .then(res => {
                                //
                                return res.json()
                            })
                            .then(data => {
                                
                                setCamp(prev => ({
                                    ...prev,
                                    zones: [...prev.zones, data]
                                }));
                            }

                            )
                            .catch(err => {
                                console.log(err);
                            })
                    }} style={{ backgroundColor: "#0e6fd6", borderRadius: "10px", width: "100px", height: "30px", color: 'white', border: "none", cursor: "pointer" }}>등록하기</button>
                </div>

            </div>



            <div>
                <h1>성수기 설정</h1>
                <span>시작:</span><input type="date" onChange={onStartChange}></input>
                <span>끝:</span><input type="date" onChange={onEndChange}></input>
                <span>구분:</span>
                <select onChange={onTypeChange}>
                    <option value={0}>비수기</option>
                    <option value={1}>성수기</option>
                    <option value={2}>극성수기</option>
                </select>
                <button onClick={() => insertSeason()} style={{ backgroundColor: "#0e6fd6", borderRadius: "10px", width: "100px", height: "30px", color: 'white', border: "none", cursor: "pointer" }}>등록</button>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th >
                                구분
                            </th>
                            <th>
                                시작 날짜
                            </th>
                            <th>
                                끝 날짜
                            </th>
                            <th>
                                삭제
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            seasons?.map((season, i) =>
                                <tr key={i}>
                                    <td>{season.type}</td>
                                    <td>{season.start}</td>
                                    <td>{season.end}</td>
                                    <td><button onClick={() => deleteSeason(season.seq)}>삭제</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default CampSettingDetailPage;
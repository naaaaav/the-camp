import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleBox from "../../components/detail/TitleBox";
import styles from '../../styles/admin/campSettingDetailPage.module.css';

function CampSettingDetailPage(){

    const { id } = useParams();

    const [camp,setCamp] = useState({});
   // const [zones,setZones] = useState([]);
   const [seasons,setSeasons] = useState([]);
   const [seasonInput,setSeasonInput] = useState({
        seq:'',
        start:'',
        end:'',
        type:'',
        campsite:id
   });

    const [inputs,setInputs] = useState({
        title:'',
        intro:'',
        checkin:'',
        checkout:'',
        offSeasonPrice:'',
        peakSeasonPrice:'',
        bestPeakSeasonPrice:'',
        numOfSite:0
    });

    const onChange = (e) => {
        const { value, name} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        });
        console.log(inputs);
    }

    useEffect(()=>{

        fetch("http://localhost:8080/campsite/zone/site/"+id , {
            method:'GET',
        }).then((res) => res.json())
        .then(data => {
            setCamp(data);
            
        });


        fetch("http://localhost:8080/season/campsiteSeq/"+id , {
            method:'GET'
        }).then((res) => res.json())
        .then(data => {
            console.log(data);
            setSeasons(data);
        })

    },[id]);

    const deleteZone = (seq) => {
        fetch("http://localhost:8080/zone/"+seq , {
            method:'DELETE',
        }).then((res) => res.json())
        .then(data => {
            console.log(data);
        })
    }

    const deleteSeason = (seq) => {
        fetch("http://localhost:8080/season/"+seq , {
            method:'DELETE',
        }).then((res)=> res.json())
        .then(data => {
            setSeasons(prevData => prevData.filter(item => item.seq !== data))
            console.log(data);
        })
    }
    

    const onStartChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            start:e.target.value
        })
        
    }

    const onEndChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            end:e.target.value
        })
        
    }

    const onTypeChange = (e) => {
        setSeasonInput({
            ...seasonInput,
            type:e.target.value
        })
       // console.log(seasonInput);
    }

    const insertSeason = (e) => {
        fetch("http://localhost:8080/season" , {
            method:'POST',
            headers:{
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
          
            console.log("data:" + data.seq);
            setSeasons(prevData => [...prevData, data]);
            console.log(seasons);
        }
    ).catch(err => {
        console.log(err);
        alert(err);
    })
    }

    return(
        <div>
            <TitleBox title={camp.facltNm}>
                <div style={{ border:"1px solid black"}}>
                    <h1>구역 목록</h1>
                    <div id="zoneBox">
                        
                        {
                            camp?.zones?.map(
                                item =>
                                
                                <div className={styles.zoneContainer}>
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
                                        {
                                            item.sites.map(
                                                site => 
                                                    <div className={styles.siteBox}>
                                                        {site.title}
                                                    
                                                    </div>                                            )
                                        }
                                    </div>
                                    <button onClick={()=>deleteZone(item.seq)}>삭제</button>
                                </div>

                            )
                        }

                        <table>
                            <tr>
                                <th>구역 이름</th>
                                <th>한줄 소개</th>
                                <th>체크인 시간</th>
                                <th>체크아웃 시간</th>
                                <th>비수기 가격</th>
                                <th>성수기 가격</th>
                                <th>극성수기 가격</th>
                                <th>구획 수</th>
                            </tr>
                            <tr>
                                <td><input type="text" name="title" onChange={onChange}></input></td>
                                <td><input type="text" name="intro" onChange={onChange}></input></td>
                                <td><input type="time" name="checkin" onChange={onChange}></input></td>
                                <td><input type="time" name="checkout" onChange={onChange}></input></td>
                                <td><input type="number" name="offSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="peakSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="bestPeakSeasonPrice" onChange={onChange}></input></td>
                                <td><input type="number" name="numOfSite" onChange={onChange}></input></td>
                            </tr>
                                
                        </table>
                        <button onClick={()=> {
                            fetch("http://localhost:8080/zone" ,{
                                method: 'POST',
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('Authorization')
                                },
                                body: JSON.stringify({
                                    ...inputs,
                                    campSite:id
                                })
                            })
                            .then(res => {
                                res.json()
                            })
                            .then(data => {
                                console.log(data);
                               
                            })
                            .catch( err => {
                                console.log(err);
                            })
                        }}>등록하기</button>
                    </div>
                    
                </div>
                

            </TitleBox>
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
                <button onClick={()=> insertSeason()}>등록</button>
                <table className={styles.table}>
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
                    {
                        seasons?.map((season,i)=> 
                            <tr key={i}>
                                <td>{season.type}</td>
                                <td>{season.start}</td>
                                <td>{season.end}</td>
                                <td><button onClick={()=>deleteSeason(season.seq)}>삭제</button></td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    );
}



export default CampSettingDetailPage;
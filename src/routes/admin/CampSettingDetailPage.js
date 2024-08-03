import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleBox from "../../components/detail/TitleBox";


function CampSettingDetailPage(){

    const { id } = useParams();

    const [camp,setCamp] = useState({});
   // const [zones,setZones] = useState([]);

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

        fetch("http://localhost:8080/campsite/"+id , {
            method:'GET',
        }).then((res) => res.json())
        .then(data => {
            setCamp(data);
            
        });
    },[id]);

    
    return(
        <div>
            <TitleBox title={camp.facltNm}>
                <div style={{ border:"1px solid black"}}>
                    <h1>구역 목록</h1>
                    <div id="zoneBox">
                        
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

                        </table>
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
                                console.log(res);
                            })
                            .catch( err => {
                                console.log(err);
                            })
                        }}>등록하기</button>
                    </div>
                    
                </div>
                

            </TitleBox>
        </div>
    );
}



export default CampSettingDetailPage;
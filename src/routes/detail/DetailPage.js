import React, { useEffect, useState } from "react";
import ImageBox from "../../components/detail/ImageBox";
import TitleBox from "../../components/detail/TitleBox";
import styles from "../../styles/detail/DetailPage.module.css"
import ReviewBox from "../../components/detail/ReviewBox";
import { useParams } from "react-router-dom";
import ZoneBox from "../../components/admin/ZoneBox"



function DetailPage(){
    const { id } = useParams();
    console.log(id);

    const[campsite,setCampsite] = useState({});

    useEffect(()=>{

        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7b68b4d5b5ae9659c8d9d36de208ea73&autoload=false";
        script.async = true;
        document.body.appendChild(script);

        script.addEventListener("load", ()=>{
            window.kakao.maps.load(()=>{
                const response = fetch("http://localhost:8080/campsite/zone/site/"+id , {
                    method:'GET',
                }).then((res) => res.json())
                .then((data) => {
                    
                    console.log(data.mapX);
                    console.log(data.mapY);
        
                    const container = document.getElementById('map');
                     const options = {
                        center: new window.kakao.maps.LatLng(data?.mapY, data?.mapX),
                     level: 3 
                     };
        
                    const map = new window.kakao.maps.Map(container, options);
        
                    var marker = new window.kakao.maps.Marker({
                        map:map,
                        position: new window.kakao.maps.LatLng(data?.mapY,data?.mapX)
                    });
        
                    console.log(data);
                     setCampsite(data);
                });
            })

        })


        

        return ()=> script.remove();
        
    },[id]);

    
    return(
        <div style={{margin:"0 auto", display:"flex" , justifyContent:"center"}}>
            <div>
            <h1>{campsite.facltNm}</h1>
            <ImageBox width="1200px" height="200px" src={campsite.firstImageUrl}></ImageBox>
            <h5>{campsite.addr1}</h5>
            <div className={styles.container}>
            <div>
                <div id="map" style={{width:'500px' , height:'400px'}}/>
            </div>
            <TitleBox title="캠핑장 소개">
                <p>
                    {
                        campsite.featureNm  
                    }
                </p>
            </TitleBox>
            </div>
            <TitleBox title="시설">
                {
                    campsite.sbrsCl
                }
            </TitleBox>

            <TitleBox title="구역">
                {
                    campsite?.zones?.map((item,i)=>
                        <div style={{border:"1px solid black" , borderRadius:"10px",margin:"10px", width:"1200px"}}>
                            <h3>{ item.title }</h3>
                            <p>{ item.intro}</p>
                            <p>
                                <span>체크인:{item.checkin}</span>
                                <span style={{marginLeft:"10px"}}>체크아웃:{item.checkin}</span>
                            </p>
                        </div>
                    )
                }
            </TitleBox>

            <TitleBox title="후기">
                <table>
                    <tr>
                        <td><ReviewBox width="500px" writer="누구누구"></ReviewBox></td>
                        <td><ReviewBox width="500px" writer="누구누구"></ReviewBox></td>
                    </tr>
                    <tr>
                        <td><ReviewBox width="500px" writer="누구누구"></ReviewBox></td>
                        <td><ReviewBox width="500px" writer="누구누구"></ReviewBox></td>
                    </tr>
                </table>

                   
                    
            </TitleBox>
            </div>
        </div>
    );
}


export default DetailPage;




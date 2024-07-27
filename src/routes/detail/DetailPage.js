import React, { useEffect, useState } from "react";
import ImageBox from "../../components/detail/ImageBox";
import TitleBox from "../../components/detail/TitleBox";
import styles from "../../styles/detail/DetailPage.module.css"
import ReviewBox from "../../components/detail/ReviewBox";
import { useParams } from "react-router-dom";

const { kakao } = window;


function DetailPage(){
    const { id } = useParams();
    console.log(id);

    const[campsite,setCampsite] = useState({});

    useEffect(()=>{

        const response = fetch("http://localhost:8080/campsite/"+id , {
            method:'GET',
        }).then((res) => res.json())
        .then((data) => {
            
            console.log(data.mapX);
            console.log(data.mapY);

            const container = document.getElementById('map');
             const options = {
                center: new kakao.maps.LatLng(data?.mapY, data?.mapX),
             level: 3 
             };

            const map = new kakao.maps.Map(container, options);
            console.log(data);
             setCampsite(data);
        });
        
    

        

        
         
        


    },[id]);
    return(
        <div style={{margin:"0 auto"}}>
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
    );
}


export default DetailPage;




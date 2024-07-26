import React, { useEffect } from "react";
import ImageBox from "../../components/detail/ImageBox";
import TitleBox from "../../components/detail/TitleBox";
import styles from "../../styles/detail/DetailPage.module.css"
import ReviewBox from "../../components/detail/ReviewBox";
import { useParams } from "react-router-dom";

const { kakao } = window;


function DetailPage(){
    const { id } = useParams();
    console.log(id);
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        const map = new kakao.maps.Map(container, options);

    },[]);
    return(
        <div style={{margin:"0 auto"}}>
            <h1>마검포 해수욕장</h1>
            <ImageBox width="1200px" height="200px" src="https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg"></ImageBox>
            <h5>주소: 인천시 연수구 송도</h5>
            <div className={styles.container}>
            <div>
                <div id="map" style={{width:'500px' , height:'400px'}}/>
            </div>
            <TitleBox title="캠핑장 소개">
                <p>
                    "아웃오브파트는 강원도 춘천시 남면에 자리했다. 서울양양고속도로 강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다. 이곳은 북한강 변의 수려한 풍광을 배경으로 캐러밴 40대가 들어찼다. 고급스러움이 돋보이는 유럽피안 캐러밴과 에어스트림 캐러밴이다. 모든 캐러밴은 각기 다른 주제로 꾸몄다. 이 덕분에 욕실에 중점을 둔 객실이나 침실에 초점을 맞춘 객실 등 취향에 따라 선택하는 재미가 있다. 외부에는 어닝 아래 테이블, 의자, 노천욕탕, 바비큐 시설을 마련했다. 캠핑장의 강점 중 하나는 부대시설이다. 카페, 수영장, 찜질방, 스파, 중앙 무대, 분수, 노래방 등 고급스러움으로 치장한 시설이 차고 넘친다."
                </p>
            </TitleBox>
            </div>
            <TitleBox title="시설">
                화장실,샤워실,개수대,전기,인터넷,장작판매
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




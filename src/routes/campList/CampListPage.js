
import { useEffect,useState } from "react";
import CampBox from "../../components/campList/CampBox";
import SearchBar from "../../components/campList/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

const { kakao } = window;
function CampListPage(){
    //const [page,setPage] = useState(1);
    const [campList,setCampList] =useState([]);
    let [query, setQuery] = useSearchParams();
    const [total, setTotal] = useState(0);
    useEffect(()=>{

        // mount  -> index.html 의 script

        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7b68b4d5b5ae9659c8d9d36de208ea73&autoload=false";
        script.async = true;
        document.body.appendChild(script);

        const response = fetch("http://localhost:8080/campsite?page="+query.get("page"),{
            method:'GET'
        }).then((res) => res.json())
        .then((data) => {
            
            const container = document.getElementById('map');
             const options = {
                center: new kakao.maps.LatLng(37.499453350021426, 127.03316070814535),
                level: 14 
             };
            const map = new kakao.maps.Map(container, options);


            for(let i =0;i<data?.content?.length;i++){
                var marker = new kakao.maps.Marker({
                    map:map,
                    position: new kakao.maps.LatLng(data.content[i].mapY,data.content[i].mapX),
                });

                var content = '<div class="label" style="border: 1px solid gray ; background-color: white ; margin-bottom: 90px; border-radius:10px"><span class="center">'+
                    data.content[i].facltNm
                +'</span></div>';

                var position = new kakao.maps.LatLng(data.content[i].mapY,data.content[i].mapX);

                var customOverlay = new kakao.maps.CustomOverlay({
                    position:position,
                    content:content
                });

                customOverlay.setMap(map);
            }

            


            setTotal(data.totalPages);
            setCampList(data.content);
           
        });
        
        return ()=> script.remove();
        

    },[query]);

    return(
    <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
        <SearchBar></SearchBar>
        <div style={{display:"flex"}}>
        <div style={{width:"1000px" , display:"flex" , flexWrap:"wrap"}}>
            {
                campList?.map( (item,i) => 

                  <Link to={`/detail/${item.seq}`} key={i} ><CampBox src={item.firstImageUrl} price="50000원~" facltNm={item.facltNm}></CampBox></Link>  
                )
            }
        </div>
        <div id="map" style={{width:'500px' , height:'400px' , marginTop:"100px"}}/>
        </div>
            <PaginationBox>
            <Pagination
             activePage={Number(query.get("page"))+1}
             itemsCountPerPage={6}
             totalItemsCount={total*6}
             pageRangeDisplayed={5}
             onChange={(page)=> setQuery({page:page-1})}>
            </Pagination>
            </PaginationBox>
        
    </div>
    );
}

const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #337ab7; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: blue; }
`


export default CampListPage;
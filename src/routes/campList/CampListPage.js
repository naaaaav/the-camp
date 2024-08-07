
import { useEffect,useState } from "react";
import CampBox from "../../components/campList/CampBox";
import SearchBar from "../../components/campList/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import { CampListAtom } from "../../recoil/atom/CampListAtom";
import { useRecoilState } from "recoil";


function CampListPage(){
    //const [page,setPage] = useState(1);
    const [campList,setCampList] = useState([]);
    let [query, setQuery] = useSearchParams();
    const [total, setTotal] = useState(0);
    useEffect(()=>{

        // mount  -> index.html 의 script

        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7b68b4d5b5ae9659c8d9d36de208ea73&autoload=false";
        script.async = true;
        document.head.appendChild(script);

        script.addEventListener("load", ()=>{
            window.kakao.maps.load(()=>{
                const container = document.getElementById('map');
             const options = {
                center: new window.kakao.maps.LatLng(37.499453350021426, 127.03316070814535),
                level: 14 
             };
                const map = new window.kakao.maps.Map(container, options);

                const response = fetch("http://localhost:8080/campsite/searchCampsites?page="+query.get("page")+"&query="+query.get("query")+"&type="+query.get("type")
        +"&size=6",{
            method:'GET'
        }).then((res) => res.json())
        .then((data) => {
            
            for(let i =0;i<data?.content?.length;i++){
                var marker = new window.kakao.maps.Marker({
                    map:map,
                    position: new window.kakao.maps.LatLng(data.content[i].mapY,data.content[i].mapX),
                });

                const content = '<div class="label" style="border: 1px solid gray ; background-color: white ; margin-bottom: 90px; border-radius:10px"><span class="center">'+
                    data.content[i].facltNm
                +'</span></div>';

                const position = new window.kakao.maps.LatLng(data.content[i].mapY,data.content[i].mapX);

                const customOverlay = new window.kakao.maps.CustomOverlay({
                    position:position,
                    content:content
                });

                customOverlay.setMap(map);
            }

            


            setTotal(data.totalPages);
            setCampList(data.content);
           
        });



            })
        });
        
        return ()=> script.remove();
        

    },[query]);

    return(
    <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
        <SearchBar setQuery={setQuery}></SearchBar>
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
             onChange={(page)=> {
                
                setQuery((prev) => {
                    
                    prev.set('page',page-1);
                    prev.set('type', prev.get("type"));
                    prev.set('query',prev.get("query"));

                    return prev;
                    
                })
             }}>
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
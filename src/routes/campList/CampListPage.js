
import { useEffect,useState } from "react";
import CampBox from "../../components/campList/CampBox";
import SearchBar from "../../components/campList/SearchBar";
import { useSearchParams } from "react-router-dom";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

const { kakao } = window;
function CampListPage(){
    //const [page,setPage] = useState(1);
    const [campList,setCampList] =useState([]);
    let [query, setQuery] = useSearchParams();
    const [total, setTotal] = useState(0);
    useEffect(()=>{

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
            setTotal(data.totalPages);
            setCampList(data.content);
           
        });

    },[query]);

    return(
    <div>
        <SearchBar></SearchBar>
       
        <div style={{width:"1000px" , display:"flex" , flexWrap:"wrap"}}>
            {
                campList?.map( item => 
                    <CampBox src={item.firstImageUrl} price="50000원~" facltNm={item.facltNm}></CampBox>
                )
            }
        </div>
            <PaginationBox>
            <Pagination
             activePage={query.get("page")}
             itemsCountPerPage={6}
             totalItemsCount={total*6}
             pageRangeDisplayed={5}
             onChange={(page)=> setQuery({page:page})}>
            </Pagination>
            </PaginationBox>
        <div id="map" style={{width:'500px' , height:'400px'}}/>
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
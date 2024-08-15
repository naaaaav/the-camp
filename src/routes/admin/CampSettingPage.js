import { useEffect, useState} from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import ImageBox from "../../components/detail/ImageBox";
import TitleBox from "../../components/detail/TitleBox";
import apiFetch from "../../utils/api";

function CampSettingPage(){
    const [keyword,setKeyword] = useState("");
    const [campList,setCampList] = useState({});
    let [searchParam, setSearchParam ] = useSearchParams();
    useEffect(()=>{

        apiFetch("/campsite/?page="+searchParam.get("page")+"&query="+searchParam.get("keyword")+"&type=title" , {
            method:'GET'
        } ).then((res) => res.json())
        .then((data)=>{
          setCampList(data);
           console.log(data);
        })


    },[searchParam]);

    return(
        <div>
            <input type="text" onChange={(e)=>{
                setKeyword(e.target.value);
            }}></input>
            <button onClick={() =>
                setSearchParam({ page:"0" , keyword:keyword})
            }>검색</button>

            <div>
                {
                    campList?.content?.map( item =>
                        <Link to={`/admin/camp/${ item.seq }`}>
                        <div style={{display:"flex"}}>
                            <ImageBox width="80px" height="80px" src={item.firstImageUrl}></ImageBox>
                            <TitleBox title={item.facltNm}></TitleBox>
                        </div>
                        </Link>
                    )
                }
            <PaginationBox>
            <Pagination
             activePage={searchParam.get("page")}
             itemsCountPerPage={9}
             totalItemsCount={campList.totalElements}
             pageRangeDisplayed={5}
             onChange={(page)=> setSearchParam({page:page-1 , keyword:keyword})}>
            </Pagination>
            </PaginationBox>
            </div>

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


export default CampSettingPage;
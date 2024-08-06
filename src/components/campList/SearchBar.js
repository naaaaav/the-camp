
import styles from '../../styles/campList/SearchBar.module.css';
import { useRecoilState } from 'recoil';
import { CampListAtom } from '../../recoil/atom/CampListAtom';
import { useState } from 'react';

function SearchBar(props){

    const [campList,setCampList] = useRecoilState(CampListAtom);
    const [input , setInput ]= useState("");
    const [type , setType] = useState("region");

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleType = (e) => {
        setType(e.target.value);
    }

    const handleSearch = () => {
        props.setQuery({page:0 , query:input , type: type});
    }

    return(
        <div className={styles.container}>
    <select className={styles.select} onChange={handleType}>
        <option value={"region"}>지역별</option>
        <option value={"title"}>캠핑장명</option>
    </select>
    <input type='text' className={styles.input} placeholder='검색어를 입력하세요' onChange={handleInput} ></input>
    <button className={styles.button} onClick={handleSearch}>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </button>
</div>
    );
}


export default SearchBar;
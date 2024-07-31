
import styles from '../../styles/campList/SearchBar.module.css';


function SearchBar(){
    return(
        <div className={styles.container}>
    <select className={styles.select}>
        <option>지역별</option>
        <option>캠핑장명</option>
    </select>
    <input type='text' className={styles.input} placeholder='검색어를 입력하세요'></input>
    <button className={styles.button}>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </button>
</div>
    );
}


export default SearchBar;
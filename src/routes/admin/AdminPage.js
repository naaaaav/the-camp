import { Outlet,Link } from "react-router-dom";
import styles from '../../styles/admin/adminPage.module.css'


function AdminPage(){
    return(
        <div className={styles.nav}>
            <ul>
                <li><Link to={"camp?page=0&keyword="}>캠핑장 관리</Link></li>
                <li><Link>쿠폰 관리</Link></li>
                <li><Link>예약 관리</Link></li>
            </ul>

            <Outlet />
        </div>
    );
}


export default AdminPage;
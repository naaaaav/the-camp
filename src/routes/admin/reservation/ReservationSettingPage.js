import { useEffect,useState } from "react";
import apiFetch from "../../../utils/api";
import { useSearchParams } from "react-router-dom";



function ReservationSettingPage(){
   const [query,setQuery] = useSearchParams();
    const [reservations , setReservations] = useState([]);
    useEffect(()=>{
        const page = query.get("page") || 0;
        apiFetch("/reservation?page="+page)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            setReservations(data.content);
        });

      


    },[query]);

    return(
        <div>
            <table>
                <tr>
                <th>예약번호</th>
                <th>캠핑장</th>
                <th>존</th>
                <th>구획</th>
                <th>시작날짜</th>
                <th>끝날짜</th>
                <th>구성원</th>
                <th>가격</th>
                <th>상태</th>
                <th>등록</th>
                </tr>
                {
                    reservations?.map(item => 
                        <tr>
                            <td>{item.reservationId}</td>
                            <td>{item.campsiteName}</td>
                            <td>{item.zoneName}</td>
                            <td>{item.siteTitle}</td>
                            <td>{item.reserveStartDate}</td>
                            <td>{item.reserveEndDate}</td>
                            <td>성인:{item.adults} 어린이:{item.children}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.reservationState}</td>
                            <td><button>수정</button></td>
                        </tr>
                    )
                }
            </table>
        </div>
    );
}



export default ReservationSettingPage;
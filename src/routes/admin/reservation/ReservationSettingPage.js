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

    const handleReservationState = function(event , index){
        const newState = event.target.value;

        const updatedReservations = reservations.map((item, i) =>
            i === index ? { ...item, reservationState: newState } : item
          );

          console.log(updatedReservations);
          setReservations(updatedReservations);
    }

    const updateReservation = function(item){
        console.log(item);
        fetch("/api/reservation",{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json;',
                'Authorization': localStorage.getItem('Authorization')
            },
            body: JSON.stringify(item)
        })
        .then(res => { return res.json()})
        .then(data => console.log(data));
    }

    return(
        <div>
            <table>
                <thead>
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
                </thead>
                <tbody>
                {
                    reservations?.map( (item,i) => 
                        <tr key={i}>
                            <td>{item.reservationId}</td>
                            <td>{item.campsiteName}</td>
                            <td>{item.zoneName}</td>
                            <td>{item.siteTitle}</td>
                            <td>{item.reserveStartDate}</td>
                            <td>{item.reserveEndDate}</td>
                            <td>성인:{item.adults} 어린이:{item.children}</td>
                            <td>{item.totalPrice}</td>
                            <td>
                                <select value={item.reservationState} onChange={(e) => handleReservationState(e,i)}>
                                    <option value="RESERVATION_DONE">RESERVATION_DONE</option>
                                    <option value="NO_CANCEL">NO_CANCEL</option>
                                    <option value="USE_COMPLETE">USE_COMPLETE</option>
                                    <option value="CANCEL">CANCEL</option>
                                </select>
                            </td>
                            <td><button onClick={()=>updateReservation(item)} >수정</button></td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}



export default ReservationSettingPage;
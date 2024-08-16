import axios from 'axios';
const RES = 'http://localhost:8080/inventory';

//쿠폰 사용시 api 요청 후 쿠폰 사용했다는 true 값을 보냄.
//invenSeq을 인자로 받음.
//성공 시 inventoryDto의 정보가 반환.
//실패 시 null이 반환.
export const applyCoupon = async (invenSeq) => {
    console.log("Data : ", invenSeq);
    try {
        const response = await axios.patch(
            `${RES}/${invenSeq}`,
        );

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

//사용자가 가지고 있는 쿠폰 리스트를 반환
//user에 대한 정보를 인자로 받음.
//성공 시 List<InventoryDto>의 정보가 반환.
//실패 시 null이 반환.
export const UserCoupons = async () => {
    try {
        const response = await axios.get(
            `${RES}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("Authorization")
                },
            }
        );

        console.log("userCoupons : ", response.data);
        return response.data;
    } catch (error) {
        console.error("쿠폰 목록을 가져오는 데 실패했습니다:", error);
        return null;
    }
};

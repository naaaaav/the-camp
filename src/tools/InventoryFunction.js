import apiFetch from "../utils/api";
const RES = '/inventory';

//쿠폰 사용시 api 요청 후 쿠폰 사용했다는 true 값을 보냄.
//invenSeq을 인자로 받음.
//성공 시 inventoryDto의 정보가 반환.
//실패 시 null이 반환.
export const applyCoupon = async (invenSeq) => {
    try {
        const response = await apiFetch(`${RES}/${invenSeq}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

//사용자가 가지고 있는 쿠폰 리스트를 반환
//user에 대한 정보를 인자로 받음.
//성공 시 List<InventoryDto>의 정보가 반환.
//실패 시 null이 반환.
export const UserCoupons = async () => {
    try {
        const response = await apiFetch(`${RES}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("Authorization"),
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};
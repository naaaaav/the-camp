import apiFetch from "../utils/api";
const RES = '/reservation';


//해당 사이트에 예약이 있는지 확인
export const getReservationExistence = async (existenceDto) => {
    try {
        const response = await apiFetch(`${RES}/existence`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existenceDto),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};
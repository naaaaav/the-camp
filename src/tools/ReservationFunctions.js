import apiFetch from "../utils/api";
const RES = '/reservation';


//해당 사이트에 예약이 있는지 확인
export const getReservationExistence = async (existenceDto) => {
    console.log("Data : ", existenceDto);
    try {
        const response = await apiFetch(`${RES}/existence`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existenceDto),
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};
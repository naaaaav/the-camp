import axios from 'axios';
const RES = 'http://localhost:8080/reservation';

//해당 사이트에 예약이 있는지 확인
export const getReservationExistence = async (existenceDto) => {
    console.log("Data : ", existenceDto);
    try {
        const response = await axios.post(
            `${RES}/existence`,
            existenceDto
        );

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

import axios from 'axios';
const RES = 'http://localhost:8080/season';

export const getSeasonType = async (campSiteSeq, seasonDto) => {
    console.log("Data : ", seasonDto);
    try {
        const response = await axios.get(
            `${RES}/reserve/${campSiteSeq}`, {
            params: {
                start: seasonDto.start,
                end: seasonDto.end
            }
        }
        );

        console.log("seasonData : ", response.data);

        return response.data.data; // 서버에서 반환하는 데이터 구조에 따라 수정
    } catch (error) {
        console.log(error.message);
        return null;
    }
};
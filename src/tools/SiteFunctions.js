import axios from 'axios';
const RES = 'http://localhost:8080/site';

// 존에 따른 사이트를 받아오는 함수.
// zoneSeq를 인자로 받는다.
// 성공 시 존에 따른 사이트가 담긴 배열이 반환.
// 실패 시 null이 반환.
export const getSiteByZone = async (zoneSeq) => {
    try {
        console.log(RES);
        console.log(zoneSeq);
        const response = await axios.get(
            `${RES}/${zoneSeq}`
        );

        return response.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};
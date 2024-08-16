import apiFetch from "../utils/api";
const RES = '/site';

// 존에 따른 사이트를 받아오는 함수.
// zoneSeq를 인자로 받는다.
// 성공 시 존에 따른 사이트가 담긴 배열이 반환.
// 실패 시 null이 반환.
export const getSiteByZone = async (zoneSeq) => {
    try {
        const response = await apiFetch(`${RES}/${zoneSeq}`, {
            method: 'GET',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};
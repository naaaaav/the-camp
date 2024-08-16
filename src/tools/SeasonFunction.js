import apiFetch from "../utils/api";
const RES = '/season';

export const getSeasonType = async (campSiteSeq, seasonDto) => {
    try {
        const queryParams = new URLSearchParams({
            start: seasonDto.start,
            end: seasonDto.end
        }).toString();

        const response = await apiFetch(`${RES}/reserve/${campSiteSeq}?${queryParams}`, {
            method: 'GET',
        });

        const data = await response.json();

        return data.data; // 서버에서 반환하는 데이터 구조에 따라 수정
    } catch (error) {
        return null;
    }
};
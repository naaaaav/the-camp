import apiFetch from "../utils/api";
const RES = '/zone'

export const getZoneByZoneSeq = async (zoneSeq) => {
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
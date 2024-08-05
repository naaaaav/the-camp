import axios from 'axios';
const RES = 'http://localhost:8080/zone'

export const getZoneByZoneSeq = async (zoneSeq) => {
    try {
        const response = await axios.get(
            `${RES}/${zoneSeq}`
        );

        return response.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};
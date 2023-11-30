import axios from 'axios';
import env from 'react-dotenv';

export const fetchMetar = async (icao: string): Promise<any> => {
    return axios
        .get('https://avwx.rest/api/metar/' + icao, {
            headers: {
                Authorization: 'BEARER ' + env.ACCESS_TOKEN,
            },
        })
        .then((response: any) => {
            return response;
        });
};

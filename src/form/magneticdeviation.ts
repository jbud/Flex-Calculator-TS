import axios from 'axios';
import env from 'react-dotenv';

export const deviation = async (lat: string, lon: string): Promise<number> => {
    return axios
        .get(
            `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${lat}&lon1=${lon}&key=${env.API_TOKEN}&resultFormat=json`
        )
        .then((response) => {
            return parseFloat(response.data.result[0].declination);
        });
};

export const calculateDeviation = (
    magneticDeclination: number,
    trueHeading: string,
    isWest: boolean
) => {
    if (magneticDeclination > 0) {
        if (isWest) {
            let magneticHeading = parseFloat(trueHeading) - magneticDeclination;
            magneticHeading =
                magneticHeading < 0 ? magneticHeading + 360 : magneticHeading;
            return magneticHeading;
        }
        let magneticHeading = parseFloat(trueHeading) + magneticDeclination;
        magneticHeading =
            magneticHeading > 360 ? magneticHeading - 360 : magneticHeading;
        return magneticHeading;
    }
    return parseFloat(trueHeading);
};

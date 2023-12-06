export const getSimbreif = async (username: string) => {
    return fetch(
        `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`
    )
        .then((res) => res.json())
        .then((json) => {
            return {
                icao: json.origin.icao_code,
                rw: json.origin.plan_rwy,
                tow: json.weights.est_tow,
                wunit: json.api_params.pounds === '1' ? 'LBS' : 'KGS',
                raw: json,
            };
        });
};

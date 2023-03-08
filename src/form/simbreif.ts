import { useDispatch } from 'react-redux';

import { debug, DebugMessage } from '../store/masterDebug';

const useSimbreif = async (username: string) => {
    const disp = useDispatch();
    const sendDebug = (formattedDebug: DebugMessage) => {
        disp(debug(formattedDebug));
    };
    fetch(
        `https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`
    )
        .then((res) => res.json())
        .then((json) => {
            // TODO: parse the json and send it to the store
        })
        .catch((err) => {
            sendDebug({
                title: 'Error',
                message: JSON.stringify(err),
            });
        });
};

export default useSimbreif;

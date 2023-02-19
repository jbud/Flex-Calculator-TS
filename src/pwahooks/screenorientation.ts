import { useEffect, useState } from 'react';

const getOrientation = () => window.orientation;

const useScreenOrientation = () => {
    const [orientation, setOrientation] = useState(getOrientation());

    const updateOrientation = () => {
        setOrientation(getOrientation());
    };

    useEffect(() => {
        window.addEventListener('orientationchange', updateOrientation);
        return () => {
            window.removeEventListener('orientationchange', updateOrientation);
        };
    }, []);

    return orientation;
};

export default useScreenOrientation;

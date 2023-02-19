import { useEffect, useRef, useState } from 'react';

interface WindsockProps {
    windDirRelative: number;
}

const Windsock = ({ windDirRelative = 0 }: WindsockProps) => {
    const windsock = useRef<SVGSVGElement | null>(null);
    const [wind, setWind] = useState(0);

    useEffect(() => {
        if (windsock.current) {
            windsock.current.setCurrentTime(0);
        }
        setTimeout(() => {
            setWind(windDirRelative);
        }, 450);
    }, [windDirRelative, windsock]);

    const TheAnimation = () => {
        return (
            <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${wind} 65 30`}
                to={`${windDirRelative} 65 30`}
                dur="0.5s"
            />
        );
    };

    return (
        <svg
            ref={windsock}
            viewBox="-40 -40 230 160"
            width="230"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                filter: 'drop-shadow(0px 0px 4px rgb(0 0 0))',
            }}
        >
            <defs></defs>
            <g transform={`rotate(${wind} 65 30)`}>
                <TheAnimation />
                <path
                    style={{
                        stroke: 'rgb(0, 0, 0)',
                        fill: 'rgb(255, 119, 0)',
                    }}
                    d="M 6.255 30.174 L 36.255 6.978 C 36.255 6.978 105.466 24.103 105.526 30.088 C 105.586 36.025 36.255 51.978 36.255 51.978 L 6.255 30.174 Z"
                ></path>
                <path
                    style={{
                        strokeWidth: '0px',
                        stroke: 'rgb(255, 255, 255)',
                        paintOrder: 'fill',
                        fill: 'rgb(235, 244, 247)',
                    }}
                    d="M 36.28 7.473 L 52.878 11.761 L 53.607 47.189 L 36.21 51.438 L 36.28 7.473 Z"
                ></path>
                <path
                    style={{
                        strokeWidth: '0px',
                        stroke: 'rgb(255, 255, 255)',
                        paintOrder: 'fill',
                        fill: 'rgb(235, 244, 247)',
                    }}
                    d="M 68.164 16.054 L 84.376 20.939 L 85.226 38.663 L 68.182 43.488 L 68.164 16.054 Z"
                ></path>
            </g>
        </svg>
    );
};

export default Windsock;

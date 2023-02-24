import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { RootState } from '../store/store';

function Mcduv2() {
    const mcduSettings = useSelector((state: RootState) => state.mcdu);

    return (
        <Box
            sx={(theme) => ({
                pt: '1.75rem',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: '371px',
                },
            })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 371 317"
                width={371}
                height={317}
                style={{
                    minWidth: '185.5px',
                    maxWidth: '350px',
                    userSelect: 'none',
                    filter: 'drop-shadow(0px 0px 8px rgb(0 0 0))',
                }}
            >
                <defs></defs>
                <rect
                    width={371}
                    height={317}
                    style={{
                        stroke: 'rgb(0, 0, 0)',
                        /* boxShadow: '0px 0px 20px black', */
                    }}
                    y={0}
                    x={0}
                    rx={10}
                    ry={10}
                />
                <g>
                    <text
                        style={{
                            fill: 'rgb(255, 255, 255)',
                            fontFamily: 'HoneywellMCDU',
                            fontSize: '22.7px',
                            whiteSpace: 'pre',
                            textAnchor: 'middle',
                        }}
                        x={185.5}
                        y={27.874}
                    >
                        {'TAKE OFF RWY '}
                        <tspan
                            style={{
                                wordSpacing: 0,
                                fill: 'rgb(4, 180, 4)',
                            }}
                        >
                            {mcduSettings.rw}
                        </tspan>
                    </text>
                </g>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                >
                    <tspan x={38} y={58}>
                        {'V1'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                >
                    <tspan x={38} y={103}>
                        {'VR'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                >
                    <tspan x={38} y={148}>
                        {'V2'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: `${
                            mcduSettings.speedSet
                                ? 'rgb(46, 204, 250)'
                                : 'rgb(254, 154, 46)'
                        }`,
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={16}
                    y={78.084}
                >
                    {mcduSettings.v1}
                </text>
                <text
                    style={{
                        fill: `${
                            mcduSettings.speedSet
                                ? 'rgb(46, 204, 250)'
                                : 'rgb(254, 154, 46)'
                        }`,
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={16}
                    y={123.409}
                >
                    {mcduSettings.vr}
                </text>
                <text
                    style={{
                        fill: `${
                            mcduSettings.speedSet
                                ? 'rgb(46, 204, 250)'
                                : 'rgb(254, 154, 46)'
                        }`,
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={16}
                    y={168.207}
                >
                    {mcduSettings.v2}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    y={194.074}
                    x={16}
                >
                    {'TRANS ALT'}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                        textAnchor: 'start',
                    }}
                >
                    <tspan x={16} y={240}>
                        {'THR RED/ACC'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(92, 92, 92)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    x={32}
                    y={284.711}
                >
                    {'UPLINK'}
                </text>
                <text
                    style={{
                        fill: 'rgb(92, 92, 92)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={16}
                    y={304.96}
                >
                    {'<TO DATA'}
                </text>
                <text
                    style={{
                        fill: 'rgb(46, 204, 250)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={18.207}
                    y={213.877}
                >
                    {'XXXX'}
                </text>
                <text
                    style={{
                        fill: 'rgb(46, 204, 250)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, -83.803467, 283.055389)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'XXXX/XXXX'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    y={58.144}
                    x={133.159}
                >
                    {'FLP RETR'}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)', //rgb(4, 180, 4)
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={142.123}
                    y={86.736}
                >
                    <tspan>{`F=`}</tspan>
                    <tspan
                        style={{
                            fill: `${
                                mcduSettings.speedSet
                                    ? 'rgb(4, 180, 4)'
                                    : 'rgb(255, 255, 255)'
                            }`,
                        }}
                    >{`${mcduSettings.speedSet ? 'XXX' : '---'}`}</tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    y={103.469}
                    x={133.415}
                >
                    {'SLT RETR'}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={142.379}
                    y={132.061}
                >
                    <tspan>{`S=`}</tspan>
                    <tspan
                        style={{
                            fill: `${
                                mcduSettings.speedSet
                                    ? 'rgb(4, 180, 4)'
                                    : 'rgb(255, 255, 255)'
                            }`,
                        }}
                    >{`${mcduSettings.speedSet ? 'XXX' : '---'}`}</tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    y={148.635}
                    x={147.6}
                >
                    {'CLEAN'}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={142.177}
                    y={177.321}
                >
                    <tspan>{`O=`}</tspan>
                    <tspan
                        style={{
                            fill: `${
                                mcduSettings.speedSet
                                    ? 'rgb(4, 180, 4)'
                                    : 'rgb(255, 255, 255)'
                            }`,
                        }}
                    >{`${mcduSettings.speedSet ? 'XXX' : '---'}`}</tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 132.845673, 266.824982)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'ENG OUT ACC'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(46, 204, 250)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 213.493759, 284.596161)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'XXXX'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 121.344086, 221.525436)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'FLEX TO TEMP'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(46, 204, 250)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: 17,
                        whiteSpace: 'pre',
                        textAnchor: 'end',
                    }}
                    x={371}
                    y={212.898}
                >
                    {`${mcduSettings.flex}\xB0`}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 155.897385, 176.200424)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'FLAPS/THS'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(46, 204, 250)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: 17,
                        whiteSpace: 'pre',
                        textAnchor: 'end',
                    }}
                    x={371}
                    y={167.166}
                >
                    {`${mcduSettings.flaps}/${mcduSettings.ths}`}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: '12pt',
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 167.41777, 130.966248)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'TO SHIFT'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(92, 92, 92)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: 17,
                        whiteSpace: 'pre',
                    }}
                    x={321.157}
                    y={122.861}
                >
                    {'[ ]*'}
                </text>
                <text
                    style={{
                        fill: 'rgb(92, 92, 92)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    transform="matrix(1, 0, 0, 1, 176.643478, 150.242279)"
                >
                    <tspan x={110.546} y={-27.619}>
                        {'[M]'}
                    </tspan>
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDUSmall',
                        fontSize: 16,
                        whiteSpace: 'pre',
                    }}
                    x={302.654}
                    y={284.828}
                >
                    {'NEXT'}
                </text>
                <text
                    style={{
                        fill: 'rgb(255, 255, 255)',
                        fontFamily: 'HoneywellMCDU',
                        fontSize: '18.7px',
                        whiteSpace: 'pre',
                    }}
                    x={289.335}
                    y={305.077}
                >
                    {'PHASE>'}
                </text>
            </svg>
        </Box>
    );
}

export default Mcduv2;

import { useContext } from 'react';
import { MCDUSettingsContextProvider } from './mcduSettings';

const MCDU = () => {
    const mcduSettings = useContext(MCDUSettingsContextProvider);
    return (
        <div id="FMC">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={4} className="larger">
                            <center>
                                TAKE OFF <span id="isrwy">RWY </span>
                                <span className="green">
                                    <span id="rwy">10L</span>
                                </span>
                            </center>
                        </td>
                    </tr>
                    <tr>
                        <td className="small" width="33%" align="left">
                            &nbsp;&nbsp;&nbsp;V1
                        </td>
                        <td colSpan={2} className="small">
                            FLP RETR
                        </td>
                        <td className="small"></td>
                    </tr>
                    <tr>
                        <td
                            className={
                                mcduSettings.speedSet
                                    ? 'large blue'
                                    : 'large orange'
                            }
                            align="left"
                        >
                            &nbsp;{mcduSettings.v1}
                        </td>
                        <td className="large">
                            F=
                            <span
                                className={
                                    mcduSettings.speedSet ? 'green' : 'white'
                                }
                            >
                                {mcduSettings.speedSet ? 'XXX' : '---'}
                            </span>
                        </td>
                        <td className="large"></td>
                    </tr>
                    <tr>
                        <td className="small" align="left">
                            &nbsp;&nbsp;&nbsp;VR
                        </td>
                        <td colSpan={2} className="small">
                            SLT RETR
                        </td>
                        <td className="small" align="right">
                            TO SHIFT
                        </td>
                    </tr>
                    <tr>
                        <td className="large" align="left">
                            &nbsp;
                            <span
                                id="vrf"
                                className={
                                    mcduSettings.speedSet ? 'blue' : 'orange'
                                }
                            >
                                <span id="vr">{mcduSettings.vr}</span>
                            </span>
                        </td>
                        <td className="large" colSpan={2}>
                            S=
                            <span
                                className={
                                    mcduSettings.speedSet ? 'green' : 'white'
                                }
                            >
                                {mcduSettings.speedSet ? 'XXX' : '---'}
                            </span>
                        </td>
                        <td className="large" align="right">
                            <span className="grey">
                                <span className="small">[M]</span>[&nbsp;]*
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="small" align="left">
                            &nbsp;&nbsp;&nbsp;V2
                        </td>
                        <td colSpan={2} className="small">
                            CLEAN
                        </td>
                        <td className="small" align="right">
                            FLAPS/THS
                        </td>
                    </tr>
                    <tr>
                        <td className="large" align="left">
                            &nbsp;
                            <span
                                id="v2f"
                                className={
                                    mcduSettings.speedSet ? 'blue' : 'orange'
                                }
                            >
                                <span id="v2">{mcduSettings.v2}</span>
                            </span>
                        </td>
                        <td className="large" colSpan={2}>
                            O=
                            <span
                                className={
                                    mcduSettings.speedSet ? 'green' : 'white'
                                }
                            >
                                {mcduSettings.speedSet ? 'XXX' : '---'}
                            </span>
                        </td>
                        <td className="large" align="right">
                            <span className="blue">
                                <span id="flaps">{mcduSettings.flaps}</span>/
                                <span id="ths">{mcduSettings.ths}</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="small" align="left">
                            &nbsp;TRANS ALT
                        </td>
                        <td colSpan={2} className="small" align="right">
                            FLEX TO TEMP
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1} className="large" align="left">
                            &nbsp;<span className="blue">XXXX</span>
                        </td>
                        <td colSpan={2} className="large"></td>
                        <td colSpan={2} className="large" align="right">
                            <span className="blue">
                                <span id="flex">{mcduSettings.flex}</span>&deg;
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="small" align="left">
                            &nbsp;THR RED/ACC
                        </td>
                        <td colSpan={2} className="small" align="right">
                            ENG OUT ACC
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="small" align="left">
                            &nbsp;&nbsp;
                            <span className="blue">XXXX/XXXX</span>
                        </td>
                        <td colSpan={2} className="small" align="right">
                            <span className="blue">XXXX</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1} className="small" align="left">
                            &nbsp;&nbsp;
                            <span className="grey">UPLINK</span>
                        </td>
                        <td colSpan={3} className="small" align="right">
                            NEXT&nbsp;&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="large" align="left">
                            &nbsp;
                            <span className="grey">&lt;TO DATA</span>
                        </td>
                        <td colSpan={2} className="large" align="right">
                            PHASE&gt;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MCDU;

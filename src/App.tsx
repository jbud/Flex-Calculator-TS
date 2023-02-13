import { useContext, useState } from 'react';
import './mcdu/mcdu.css';
import './App.css';
import MCDU from './mcdu/mcdu';
import { MCDUSettingsContextProvider, mcduSettings } from './vspeeds/vspeeds';
import { decode } from 'html-entities';

function App() {
    const speeds = useContext(MCDUSettingsContextProvider);
    const [speed, setSpeed] = useState<mcduSettings>(speeds);

    const test = () => {
        if (!speed.speedSet) {
            setSpeed({
                ...speeds,
                speedSet: true,
                v1: 127,
                vr: 128,
                v2: 129,
                flex: 69,
                flaps: 1,
                ths: '1.9UP',
            });
        } else {
            setSpeed({
                ...speeds,
                speedSet: false,
                v1: decode('&#95;&#95;&#95;'),
                vr: decode('&#95;&#95;&#95;'),
                v2: decode('&#95;&#95;&#95;'),
                flex: decode('[]'),
                flaps: decode('[]'),
                ths: decode('[&nbsp;]'),
            });
        }
    };
    return (
        <div className="App">
            <MCDUSettingsContextProvider.Provider value={speed}>
                <MCDU />
                <button onClick={test}>test</button>
            </MCDUSettingsContextProvider.Provider>
        </div>
    );
}

export default App;

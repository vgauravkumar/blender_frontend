// Importing libraries here
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// Import Components here
import Experience from "./Experience";
import Panel from "./Panel";

// Importnig css here
import "./style.css"

const App = () => {
    const [fileName, setFileName] = useState('box.glb');
    return (
        <div style={{ background: 'green' }}>
            <div className="app">
                <div className="top">Online blender</div>
                <div className="bottom">
                    <div className="left">
                        <Panel
                            setFileName={setFileName}
                        />
                    </div>
                    <div className="right">
                        <Canvas>
                            <Experience
                                fileName={fileName}
                            />
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
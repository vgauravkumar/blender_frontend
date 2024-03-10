// Importing libraries here
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

// Import Components here
import Experience from "./Experience";
import Panel from "./Panel";

// Importnig css here
import "./style.css"

const App = () => {
    const [fileName, setFileName] = useState('box.glb');
    const [scale, setScale] = useState("1");
    const [position, setPosition] = useState(0);
    const [character, setCharacter] = useState(useGLTF(`http://localhost:3001/api/model/download?fileName=${fileName}`));
    console.log('fileName,scale,position,character:', fileName, scale, position, character);
    useEffect(() => {
        const handelEffect = () => {
            console.log("App use effect called!!!");
            console.log('App.js file name:', fileName);
            const tempChar = useGLTF(`http://localhost:3001/api/model/download?fileName=${fileName}`);
            console.log('tempChar', tempChar);
            console.log("App use effect called again!!!");
            setCharacter(tempChar);
        };
        try {
            handelEffect();
        } catch (e) {
            console.log(e);
        }
    }, [fileName]);


    return (
        <div style={{ background: 'green' }}>
            <div className="app">
                <div className="top">Online blender</div>
                <div className="bottom">
                    <div className="left">
                        <Panel
                            setFileName={setFileName}
                            fileName={fileName}
                            setScale={setScale}
                            setPosition={setPosition}
                        />
                    </div>
                    <div className="right">
                        {character ? <Canvas>
                            <Experience
                                character={character}
                                scale={scale}
                                postion={position}
                            />
                        </Canvas> : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
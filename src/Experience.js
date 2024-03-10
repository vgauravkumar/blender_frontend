import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

export default function Experience({fileName, num}) {
    // const character = useGLTF(`./${fileName}`); // Can only be glb or gltf file
    const character = useGLTF(`http://localhost:3001/api/model/download?fileName=${fileName}&num=${num}`);
    // const gift = useGLTF("./gift.gltf");
    return (
        <>
        <OrbitControls/>
            <primitive
                object={character.scene}
                position-x={0}
                position-y={0}
                position-z={0}
                scale={"1"}
            />

            {/* <primitive
                object={gift.scene}
                position-x={1}
                position-y={1}
                position-z={1}
                scale="1"
            /> */}

            <Environment preset="city" />
        </>
    );
}
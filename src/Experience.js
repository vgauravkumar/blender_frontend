import { Environment, OrbitControls } from "@react-three/drei";

export default function Experience({ character, scale, postion }) {
    // const character = useGLTF(`./${fileName}`); // Can only be glb or gltf file
    // const gift = useGLTF("./gift.gltf");
    console.log("Inside exp.");
    return (
        <>
            <OrbitControls />
            <primitive
                object={character.scene}
                position-x={postion}
                position-y={postion}
                position-z={postion}
                scale={scale}
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
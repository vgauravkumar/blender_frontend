import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

export default function Experience() {
    const character = useGLTF("./character.glb");
    // const gift = useGLTF("./gift.gltf");
    return (
        <>
        <OrbitControls/>
            <primitive
                object={character.scene}
                position-x={0}
                position-y={0}
                position-z={0}
                scale="1"
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
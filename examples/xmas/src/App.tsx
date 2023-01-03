import { ContactShadows, Environment, Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense } from "react";
import { UnrealBloomPass } from "three-stdlib";
import { Model } from "./model";

extend({
    UnrealBloomPass
});

function App() {
    return (<>
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{
                position: [0, 5, 6]
            }}>
            <Suspense fallback={null}>
                <Model />
                <ambientLight intensity={3.15} position={[2.697, 0.793, -4.613]} />
                <spotLight position={[-6.315, 8.077, -18.682]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow>
                    {}
                </spotLight>
                <PerspectiveCamera makeDefault position={[0, 5, 6]} />
                <Environment preset="dawn" />
                <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={4} far={4} color="red" />
                <OrbitControls enableZoom={false} autoRotate minPolarAngle={Math.PI / 2 - 0.5} maxPolarAngle={Math.PI / 2 - 0.5} />
            </Suspense>
        </Canvas>
        <Loader
            containerStyles={{
                background: "#e6e4ef"
            }}
            dataStyles={{
                color: "#417469"
            }}
            innerStyles={{
                background: "#e6e4ef"
            }}
            barStyles={{
                background: "#417469"
            }} />
        {}
    </>);
}

export default App;
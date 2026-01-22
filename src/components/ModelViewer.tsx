import
{useRef, useState} from 'react';
import
{Canvas, useFrame} from '@react-three/fiber';
import
{OrbitControls, useTexture} from '@react-three/drei';
import * as THREE from 'three';

interface SpriteViewerProps
{
    images: {
        front: string;
        right: string;
        back: string;
        left: string;
    };
}

function RotatingSprite(
    {images} : SpriteViewerProps
)
{
    const meshRef = useRef < THREE.Mesh > (null);
    const [currentAngle, setCurrentAngle] = useState(0);

    // Load all 4 textures
    const textures = useTexture(
        {front: images.front, right: images.right, back: images.back, left: images.left}
    );

    // Update texture based on rotation angle
    useFrame(() => {
        if (meshRef.current)
        {
            const rotation = meshRef.current.rotation.y;
            const normalizedAngle = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            const degrees = (normalizedAngle * 180) / Math.PI;

            let texture;
            if (degrees >= 315 || degrees < 45)
            {
                texture = textures.front;
            }
            else if (degrees >= 45 && degrees < 135)
            {
                texture = textures.right;
            }
            else if (degrees >= 135 && degrees < 225)
            {
                texture = textures.back;
            }
            else
            {
                texture = textures.left;
            }

            if (meshRef.current.material instanceof THREE.MeshBasicMaterial)
            {
                meshRef.current.material.map = texture;
                meshRef.current.material.needsUpdate = true;
            }

            setCurrentAngle(Math.round(degrees));
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={
                [3, 3]
            }/>
            <meshBasicMaterial map={
                    textures.front
                }
                transparent={true}/>
        </mesh>
    );
}

export default function ModelViewer(
    {images} : SpriteViewerProps
)
{
    const [autoRotate, setAutoRotate] = useState(false);

    return (
        <div style={
            {
                width: '100%',
                height: '500px',
                position: 'relative'
            }
        }>
            <Canvas camera={
                {
                    position: [
                        0, 0, 5
                    ],
                    fov: 50
                }
            }>
                <ambientLight intensity={0.5}/>
                <directionalLight position={
                        [10, 10, 5]
                    }
                    intensity={1}/>
                <RotatingSprite images={images}/>
                <OrbitControls enableZoom={true}
                    enablePan={false}
                    autoRotate={autoRotate}
                    autoRotateSpeed={2}/>
            </Canvas>

            <div style={
                {
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '10px 20px',
                    borderRadius: '8px'
                }
            }>
                <button onClick={
                        () => setAutoRotate(!autoRotate)
                    }
                    style={
                        {
                            padding: '8px 16px',
                            background: autoRotate ? '#646cff' : '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }
                }>
                    {
                    autoRotate ? 'Stop Rotation' : 'Auto Rotate'
                } </button>
                <span style={
                    {
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: '14px'
                    }
                }>
                    Drag to rotate • Scroll to zoom
                </span>
            </div>
        </div>
    );
}

import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Player } from './components/Player';
import { Workshop } from './components/Workshop';
import { Elberr } from './components/Elberr';
import { GameUI } from './components/GameUI';
import { MobileTouchControlsOverlay } from './controls/touch/MobileTouchControlsOverlay';
import { useUnifiedInput } from './input/useUnifiedInput';
import { ControlsSettingsPanel } from './components/ControlsSettingsPanel';

function GameScene() {
  const controlsRef = useRef<any>(null);
  const { movement, look, actions, reset } = useUnifiedInput(controlsRef);

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
      <directionalLight position={[5, 10, 5]} intensity={0.4} castShadow />
      
      <Physics gravity={[0, -9.8, 0]}>
        <Player 
          movement={movement} 
          look={look} 
          actions={actions}
          controlsRef={controlsRef}
        />
        <Workshop />
        <Elberr />
      </Physics>
      
      <PointerLockControls ref={controlsRef} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <Canvas
          shadows
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 5] }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <GameScene />
          </Suspense>
        </Canvas>
        
        <GameUI />
        <MobileTouchControlsOverlay />
        <ControlsSettingsPanel />
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

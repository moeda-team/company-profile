// React Three Fiber example: real asset-loading progress + first rendered frame.
// Install: npm i three @react-three/fiber @react-three/drei
'use client';
import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useProgress } from '@react-three/drei';

const MODEL_URL = '/models/scene.glb'; // Replace with your actual GLB path.

function Model({ onReady }) {
  const { scene } = useGLTF(MODEL_URL);
  const [reported, setReported] = useState(false);
  useFrame(() => {
    if (!reported) {
      setReported(true);
      // useFrame fires during the render loop; notify after the browser has
      // had an opportunity to paint the first frame.
      requestAnimationFrame(() => requestAnimationFrame(onReady));
    }
  });
  return <primitive object={scene} />;
}

function LoadingOverlay({ firstFrameReady }) {
  const { progress, active, loaded, total } = useProgress();
  const [visible, setVisible] = useState(true);
  const assetsReady = !active && total > 0 && loaded >= total;
  // 0–95% = loader progress; final 5% requires a rendered scene.
  // This is a stage-based UI indicator, not a byte-exact measure of GPU work.
  const percentage = firstFrameReady && assetsReady ? 100 : Math.min(95, Math.floor(progress * 0.95));
  useEffect(() => {
    if (percentage !== 100) return;
    const timeout = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timeout);
  }, [percentage]);
  if (!visible) return null;
  return (
    <div aria-live="polite" style={{position:'fixed',inset:0,zIndex:9999,background:'#050505',color:'#fff',display:'grid',placeItems:'center',opacity:percentage===100?0:1,transition:'opacity 600ms ease',pointerEvents:'all'}}>
      <div style={{display:'grid',justifyItems:'center',gap:20}}>
        <svg viewBox="0 0 120 120" width="104" height="104" aria-label="Nodeworks logo">
          {[0,60,120,180,240,300].map((angle,i)=>{
            const r=43,rad=(angle-90)*Math.PI/180,x=60+r*Math.cos(rad),y=60+r*Math.sin(rad);
            return <g key={angle}><line x1="60" y1="60" x2={x} y2={y} stroke="white" strokeWidth="8" strokeLinecap="round"/><circle cx={x} cy={y} r="10" fill="white"/></g>;
          })}
        </svg>
        <div style={{letterSpacing:'.35em',fontSize:15}}>NODEWORKS</div>
        <div style={{width:220,height:2,background:'#333'}}><div style={{width:`${percentage}%`,height:'100%',background:'#fff',transition:'width 150ms linear'}}/></div>
        <div style={{fontSize:11,letterSpacing:'.2em',color:'#aaa'}}>PREPARING 3D SCENE · {percentage}%</div>
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [firstFrameReady,setFirstFrameReady] = useState(false);
  return <>
    <Canvas camera={{position:[3,2,6],fov:40}} gl={{antialias:true}}>
      <ambientLight intensity={1.4}/>
      <Suspense fallback={null}><Model onReady={()=>setFirstFrameReady(true)}/></Suspense>
    </Canvas>
    <LoadingOverlay firstFrameReady={firstFrameReady}/>
  </>;
}

import '@google/model-viewer';
import './styles/modelViewer.style.css'
import { useState } from 'react';
import ModelViewer from './components/ModelViewer';
import './index.css'
import Selector from './components/ModelSelector';
import ModelPanel from './components/ModelPanel';

export type ModelSpecs = {
  license?: string;
  formats?: string;
  size?: string;
  geometry?: string;
  vertices?: string;
  pbr?: string;
  textures?: number | string;
  materials?: number | string;
  uvLayers?: string;
  vertexColors?: string;
  animations?: number | string;
  riggedGeometries?: string;
  morphGeometries?: number | string;
  scaleTransformations?: string;
};

type modelObject = {
  name: string;
  src: string;
  iosSrc: string;
  alt: string;
  poster?: string;
  specs?: ModelSpecs;
}



function App() {
  const models: modelObject[] = [
    {
      name: "Frog",
      src: '/models/frog.glb',
      iosSrc: "/models/frog.usdz",
      alt: "This is a 3D model of a frog",
      poster: "/models/poster.webp",
      specs: {
        license: "CC Attribution-NonCommercial-NoDerivs",
        formats: "GLTF, USDZ, GLB",
        size: "8MB",
        geometry: "Triangles 62.4k",
        vertices: "31.3k",
        pbr: "Metalness",
        textures: 7,
        materials: 2,
        uvLayers: "Yes",
        vertexColors: "No",
        animations: 1,
        riggedGeometries: "No",
        morphGeometries: 2,
        scaleTransformations: "No"
      }
    },
    { 
      name: "Fox Turtle Hybrid", 
      src: "/models/fox-turtle_hybrid.glb", 
      iosSrc: "/models/Fox-Turtle_Hybrid_ios.usdz",
      alt: "This is a 3D model of a fox-turtle hybrid." 
    },
    { 
      name: "Skeleton Mammoth", 
      src: "/models/mammoth.glb",
      iosSrc: "/models/mammoth_ios.usdz", 
      alt: "This is a 3D model of a mammoth skeleton." 
    },
    { 
      name: "Robot", 
      src: "/models/robot_mouse.glb", 
      iosSrc: "/models/robot_mouse_ios.usdz", /* FIXED: Must be a .usdz file for iOS */
      alt: "This is a 3D model of a robot dog." 
    },
  ]

  const [model, setModel] = useState<modelObject>(models[0])
  
  return (
    <div className='model-container'>
      <Selector 
        models={models} 
        selectedModel={model} 
        onSelect={setModel}
      />
      <ModelViewer 
        src={model.src}
        iosSrc={model.iosSrc}
        alt={model.alt}
        poster={model.poster}
      />
      <ModelPanel
        title={model.name}
        specs={model.specs}
      />
    </div>
  )
}
export default App
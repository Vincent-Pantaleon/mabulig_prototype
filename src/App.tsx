import '@google/model-viewer';
import './styles/modelViewer.style.css'
import { useState } from 'react';
import ModelViewer from './components/ModelViewer';
import './index.css'
import Selector from './components/ModelSelector';

type modelObject = {
  name: string;
  src: string;
  iosSrc: string;
  alt: string;
}

function App() {
  const models: modelObject[] = [
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
    }
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
      />
    </div>
  )
}
export default App
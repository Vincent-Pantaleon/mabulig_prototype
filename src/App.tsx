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
      iosSrc: "/models/robot_mouse_ios.glb",
      alt: "This is a 3D model of a dog." 
    }
  ]

  // 2. Removed 'setModel' until you actually need it (or you can leave it and ignore the yellow warning!)
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
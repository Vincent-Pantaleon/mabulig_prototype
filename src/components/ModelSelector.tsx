// src/components/Selector.tsx
import '../styles/modeSelector.style.css'

export type modelObject = {
    name: string;
    src: string;
    iosSrc: string;
    alt: string;
}

interface SelectorProps {
    models: modelObject[];
    selectedModel: modelObject;
    onSelect: (model: modelObject) => void;
}

export default function Selector({ models, selectedModel, onSelect }: SelectorProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const chosenModel = models.find(m => m.name === e.target.value);
        if (chosenModel) {
            onSelect(chosenModel);
        }
    };

    return (
        <select 
            value={selectedModel.name} 
            onChange={handleChange}
            className='mode-selector'
        >
            {/* Map through the array to create an option for every model */}
            {models.map((model) => (
                <option key={model.name} value={model.name}>
                    {model.name}
                </option>
            ))}
        </select>
    );
}
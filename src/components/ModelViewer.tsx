import '/src/styles/modelViewer.style.css'

interface ModelViewerTypes {
    alt: string;
    src: string;
    iosSrc: string;
}

export default function ModelViewer({ alt, src, iosSrc }: ModelViewerTypes) {
    const ModelViewerTag = 'model-viewer' as any;

    return (
        <ModelViewerTag 
            alt={alt}
            src={src}
            iosSrc={iosSrc}
            ar
            camera-controls="true"
            shadow-intensity="2"
            touch-action="pan-y"
        >
        </ModelViewerTag>
    );
}
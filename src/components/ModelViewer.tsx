import '/src/styles/modelViewer.style.css'

interface ModelViewerTypes {
    alt: string;
    src: string;
    poster?: string;
    iosSrc: string;
}

export default function ModelViewer({ alt, src, poster, iosSrc }: ModelViewerTypes) {
    const ModelViewerTag = 'model-viewer' as any;

    if (!src || !iosSrc) {
        return <div>No Models found</div>
    }

    return (
        <ModelViewerTag 
            alt={alt}
            src={src}
            ios-src={iosSrc}
            ar="true"
            poster={poster}
            ar-modes="webxr scene-viewer quick-look"
            camera-controls="true"
            shadow-intensity="2"
            touch-action="pan-y"
        >
        </ModelViewerTag>
    );
}
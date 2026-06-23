import { useState } from "react";
import type { ModelSpecs } from "../App";

interface ModelPanelProps {
    title?: string;
    description?: string;
    specs?: ModelSpecs;
}

export default function ModelPanel ({title, description, specs}: ModelPanelProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            <style>{`
                .model-panel {
                    position: fixed;
                    z-index: 100;
                    box-sizing: border-box;
                    
                    /* Glassmorphism effect */
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-top: 1px solid rgba(229, 231, 235, 1);
                    
                    /* Mobile First: Anchored to the bottom, full width */
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 24px;
                    border-radius: 24px 24px 0 0;
                    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.1);
                    
                    font-family: system-ui, -apple-system, sans-serif;
                    transition: all 0.3s ease-in-out;
                    
                    /* Max height to ensure it doesn't cover the whole screen on small devices */
                    max-height: 60vh;
                    display: flex;
                    flex-direction: column;
                }

                .panel-header {
                    margin-bottom: ${isCollapsed ? '0' : '16px'};
                    flex-shrink: 0;
                    cursor: pointer; /* Indicates it's clickable */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: opacity 0.2s ease;
                }

                .panel-header:hover {
                    opacity: 0.7;
                }

                .header-text {
                    flex: 1;
                }

                .toggle-icon {
                    font-size: 0.9rem;
                    color: #6b7280;
                    margin-left: 12px;
                    transition: transform 0.3s ease;
                    transform: ${isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
                }

                .panel-title {
                    margin: 0 0 6px 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #111827;
                }

                .panel-description {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #4b5563;
                    line-height: 1.5;
                }

                .panel-content {
                    overflow-y: auto;
                    padding-right: 8px; /* Room for scrollbar */
                }

                /* Custom scrollbar for the specs list */
                .panel-content::-webkit-scrollbar {
                    width: 6px;
                }
                .panel-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .panel-content::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 20px;
                }

                /* Spec Row Styling */
                .spec-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 10px 0;
                    border-bottom: 1px solid #f3f4f6;
                    font-size: 0.85rem;
                }

                .spec-row:last-child {
                    border-bottom: none;
                }

                .spec-label {
                    color: #6b7280;
                    flex: 1;
                    padding-right: 16px;
                }

                .spec-value {
                    color: #374151;
                    font-weight: 500;
                    text-align: right;
                    flex: 1;
                }

                /* Desktop/Large Screen Styling */
                @media (min-width: 768px) {
                    .model-panel {
                        bottom: 24px;
                        right: 24px;
                        left: auto;
                        width: 360px;
                        max-height: 70vh;
                        border-radius: 16px;
                        border: 1px solid rgba(229, 231, 235, 1);
                        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                    }
                }
            `}</style>

            <div className="model-panel">
                <div className="panel-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <div className="header-text">
                        {title && <h2 className="panel-title">{title}</h2>}
                        {!isCollapsed && description && <p className="panel-description">{description}</p>}
                    </div>
                    <span className="toggle-icon">▼</span>
                </div>
                
                {/* Dynamically render specs if they exist and panel is NOT collapsed */}
                {!isCollapsed && specs && (
                    <div className="panel-content">
                        {specs.license && <div className="spec-row"><span className="spec-label">License</span><span className="spec-value">{specs.license}</span></div>}
                        {specs.formats && <div className="spec-row"><span className="spec-label">Included 3D formats</span><span className="spec-value">{specs.formats}</span></div>}
                        {specs.size && <div className="spec-row"><span className="spec-label">Download size</span><span className="spec-value">{specs.size}</span></div>}
                        {specs.geometry && <div className="spec-row"><span className="spec-label">Geometry</span><span className="spec-value">{specs.geometry}</span></div>}
                        {specs.vertices && <div className="spec-row"><span className="spec-label">Vertices</span><span className="spec-value">{specs.vertices}</span></div>}
                        {specs.pbr && <div className="spec-row"><span className="spec-label">PBR</span><span className="spec-value">{specs.pbr}</span></div>}
                        {specs.textures !== undefined && <div className="spec-row"><span className="spec-label">Textures</span><span className="spec-value">{specs.textures}</span></div>}
                        {specs.materials !== undefined && <div className="spec-row"><span className="spec-label">Materials</span><span className="spec-value">{specs.materials}</span></div>}
                        {specs.uvLayers && <div className="spec-row"><span className="spec-label">UV Layers</span><span className="spec-value">{specs.uvLayers}</span></div>}
                        {specs.vertexColors && <div className="spec-row"><span className="spec-label">Vertex colors</span><span className="spec-value">{specs.vertexColors}</span></div>}
                        {specs.animations !== undefined && <div className="spec-row"><span className="spec-label">Animations</span><span className="spec-value">{specs.animations}</span></div>}
                        {specs.riggedGeometries && <div className="spec-row"><span className="spec-label">Rigged geometries</span><span className="spec-value">{specs.riggedGeometries}</span></div>}
                        {specs.morphGeometries !== undefined && <div className="spec-row"><span className="spec-label">Morph geometries</span><span className="spec-value">{specs.morphGeometries}</span></div>}
                        {specs.scaleTransformations && <div className="spec-row"><span className="spec-label">Scale transformations</span><span className="spec-value">{specs.scaleTransformations}</span></div>}
                    </div>
                )}
            </div>
        </>
    )
}
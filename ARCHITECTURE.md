# Architecture

This document outlines the architecture and technical decisions for integrating 3D model viewing and AR into this web application.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| 3D Rendering & AR | Google `<model-viewer>` |
| AR on Android | Scene Viewer (native, via `<model-viewer>`) |
| AR on iOS | Quick Look (native, via `<model-viewer>`) |
| AR Dev Testing | ngrok (HTTPS tunnel) |

---

## Chosen Approach — Google `<model-viewer>`

`<model-viewer>` is a Google web component that abstracts 3D rendering and AR handoff into a few lines of declarative markup. It handles lighting, shadows, camera controls, and platform-specific AR automatically. In React + Vite, it is used as a custom element alongside standard JSX.

### Setup in React

Install the package:

```bash
npm install @google/model-viewer
```

Import it once in your entry file so React recognizes it as a custom element:

```tsx
// main.tsx
import '@google/model-viewer';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 3D Model File Formats

- **glTF / GLB** — The Khronos standard; known as the "JPEG of 3D." The first format to standardize Physically-Based Rendering (PBR), making models look realistic under any lighting on any renderer. GLB is the binary, single-file variant and is the primary format for `<model-viewer>` and Android AR.
- **USDZ** — Apple's Universal Scene Description format. Required for iOS Quick Look AR. Can be converted from GLB using Apple's free **Reality Converter** tool.

Place model files in `/public/models` so Vite serves them as static assets.

---

## 3D Viewer & AR

The core viewer is a React component wrapping `<model-viewer>`. It handles model rendering, camera controls, auto-rotation, and the AR button — all declaratively.

```tsx
// components/ModelViewer.tsx
export default function ModelViewer({ src, iosSrc }) {
  return (
    <model-viewer
      src={src}
      ios-src={iosSrc}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
    >
      <button slot="ar-button">View in AR</button>
    </model-viewer>
  );
}
```

```tsx
// App.tsx
import ModelViewer from './components/ModelViewer';

export default function App() {
  return (
    <ModelViewer src="/models/frog.glb" iosSrc="/models/frog.usdz" />
  );
}
```

### AR Platform Behavior

| Platform | AR Mode Triggered | Experience |
|---|---|---|
| Android (Chrome) | Scene Viewer | Native Android AR; model placed on a real-world surface |
| iOS (Safari) | Quick Look | Native iOS AR via camera; pinch to scale |
| Desktop (Chrome) | WebXR | Browser-based AR if device supports it |

`ar-modes="webxr scene-viewer quick-look"` sets the priority order `<model-viewer>` uses when launching AR.

---

## Development Environment & AR Testing

AR requires HTTPS — it will not work on plain `http://localhost`.

### Recommended Dev Setup

```
Vite (npm run dev) → ngrok HTTPS tunnel → open ngrok URL on physical mobile device
```

```bash
# Terminal 1 — start Vite dev server
npm run dev

# Terminal 2 — expose it over HTTPS
ngrok http 5173
# Opens: https://abc123.ngrok.io → open this URL on your phone
```

Android will also work with Vite's built-in self-signed cert (`vite --https`). iOS Quick Look rejects self-signed certs — always use ngrok for iOS testing.

---

## Application Architecture

```
┌─────────────────────────────────────────┐
│           React App (Vite)              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │        <model-viewer>           │   │
│   │   - Renders GLB model           │   │
│   │   - Camera controls             │   │
│   │   - "View in AR" button         │   │
│   └─────────────────────────────────┘   │
│                                         │
│          ↓ "View in AR" tapped          │
└─────────────────────────────────────────┘
         │ Android              │ iOS
         ▼                      ▼
   Scene Viewer            Quick Look
 (native Android AR)    (native iOS AR)
```

---

## File Structure

```
/
├── public/
│   └── models/
│       ├── frog.glb        # Primary 3D model (browser + Android AR)
│       └── frog.usdz       # iOS AR model
├── src/
│   ├── main.tsx            # Entry point; imports @google/model-viewer
│   ├── App.tsx             # Root component
│   └── components/
│       └── ModelViewer.tsx # Wraps <model-viewer> web component
├── index.html
└── vite.config.js
```

---

## Recommendations for Future Iterations

These are out of scope for the prototype but worth knowing as the product grows.

### Hotspot Annotations
To add interactive markers on specific parts of the model that open an info modal, `<model-viewer>` has a built-in slot system for hotspots. These are standard HTML `<button>` elements placed at 3D coordinates on the model surface, wired to React state to control a modal component. No additional libraries needed.

### Custom In-Browser Interactions
If the app needs multi-object AR, real-time object manipulation, physics, or in-scene UI overlays, migrate the viewer to **React Three Fiber**. For the AR handoff, keep using Scene Viewer (Android) and Quick Look (iOS) deep-links — this is exactly what `<model-viewer>` does under the hood, so the transition is seamless.

### Better WebXR Support
**Babylon.js** has significantly stronger built-in WebXR support than Three.js, including an XR Helper that abstracts surface anchors, hand tracking, and hit-testing. Worth evaluating if WebXR becomes central to the experience.

### Cross-Platform AR Without WebXR Limitations
**8th Wall (Niantic Studio)** is a paid platform that runs AR through the browser camera without relying on WebXR at all, bypassing iOS Safari's WebXR limitations entirely. Relevant for production planning once the prototype is validated.

### Asset Storage & Management
For production, static model files should be moved to a dedicated storage solution. **Supabase** is the recommended option — its free tier provides storage buckets for `.glb` and `.usdz` files plus a database table for model metadata (name, description, hotspot coordinates, fact content). You'd simply swap the static `/public/models/` path for a Supabase Storage URL. **Firebase Storage** and **Cloudinary** (which natively supports 3D file delivery via CDN) are solid alternatives.

### Local Server Asset Storage
If assets need to be served from a local server rather than a cloud provider, an **Express.js** server can serve the `.glb` and `.usdz` files as static assets alongside a simple JSON or SQLite database for model metadata. This keeps everything self-contained with no external dependencies.

```bash
npm install express better-sqlite3
```

```js
// server.js
import express from 'express';

const app = express();

app.use('/models', express.static('models'));

app.listen(3000, () => console.log('Asset server running on http://localhost:3000'));
```

The `ModelViewer` component then just points to `http://localhost:3000/models/frog.glb` instead of `/public/models/frog.glb`.

### Implement Lazy Loading and Suspense for 3D Assets
To optimize performance and ensure a seamless user experience, 3D models fetched from the database should utilize lazy loading (via the <model-viewer> poster attribute) or React Suspense boundaries. This prevents layout shift and provides immediate visual feedback during heavy asset downloads.
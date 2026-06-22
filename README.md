# 3D Model Viewer — Web App Prototype

A web application prototype built with React and Vite for viewing 3D models in the browser with interactive hotspot annotations and native mobile AR on both Android and iOS.

---

## What This Does

- Renders a 3D model in the browser with orbit controls (rotate, zoom, pan)
- Tapping "View in AR" places the model in your real environment using your phone's camera

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

## Getting Started

### Prerequisites

- Node.js 18+
- A physical Android or iOS device for AR testing
- [ngrok](https://ngrok.com/) for AR testing over HTTPS

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd 3d-viewer-prototype

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser to view the 3D model.

### Testing AR on a Real Device

AR requires HTTPS and a physical mobile device — it will not work in browser dev tools.

```bash
# In a second terminal, expose your local server via ngrok
ngrok http 5173
```

Open the `https://...ngrok.io` URL on your phone and tap **View in AR**.

> **iOS note:** Always use the ngrok URL for iOS. Quick Look rejects self-signed certificates.

---

## 3D Model Formats

| Format | Used For |
|---|---|
| `.glb` | Browser viewer + Android AR (Scene Viewer) |
| `.usdz` | iOS AR (Quick Look) |

Place model files in `/public/models`. To convert `.glb` → `.usdz`, use Apple's free [Reality Converter](https://developer.apple.com/augmented-reality/tools/) tool.

---

## AR Behavior by Platform

| Platform | What Happens |
|---|---|
| Android (Chrome) | Scene Viewer launches — model placed on a real surface |
| iOS (Safari) | Quick Look launches — model appears in your space, pinch to scale |
| Desktop | WebXR in-browser AR (if supported) |

> **iOS AR note:** Hotspot markers and modals do not carry into the iOS Quick Look AR view. The AR experience on iOS is view-only. This is a platform constraint, not a bug.

---

## Project Structure

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
└── vite.config.ts
```

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full technical breakdown including component structure, code examples, the app diagram, and recommendations for future iterations.
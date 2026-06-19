import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/custom-colors.css'

const container = document.getElementById("root")!;
const shouldReplaceStaticMarkup = container.dataset.renderMode === "replace";

if (container.hasChildNodes() && !shouldReplaceStaticMarkup) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}

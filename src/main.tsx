import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { normalizePath } from '@/config/site'
import './index.css'
// @fontsource/big-shoulders-display@5.3 maps "./*" to "./*.css" — import without the extension
import '@fontsource/big-shoulders-display/500'
import '@fontsource/big-shoulders-display/700'
import '@fontsource/big-shoulders-display/800'
import '@fontsource/big-shoulders-display/900'
import '@fontsource/fira-sans/400.css'
import '@fontsource/fira-sans/500.css'
import '@fontsource/fira-sans/600.css'
import '@fontsource/fira-sans/700.css'

const container = document.getElementById("root")!;

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Hydrate only markup that was prerendered for this exact path. Two cases fail
// that test and must mount fresh instead: `vite dev` serves the bare shell from
// index.html, and any SPA fallback (the 404 shell, or `vite preview` answering an
// unknown path with the homepage) hands us markup for a different route.
const prerenderedFor = container.dataset.prerendered;

if (prerenderedFor && prerenderedFor === normalizePath(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

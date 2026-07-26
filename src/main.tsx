import { createRoot } from 'react-dom/client'
import App from './App.tsx'
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

createRoot(document.getElementById("root")!).render(<App />);

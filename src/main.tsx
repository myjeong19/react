import { createRoot } from './dom/client';
import { createElement } from './api';
import { App } from './components/app';

createRoot(document.getElementById('root')!).render(<App />);

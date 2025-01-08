import { createRoot } from 'react-dom/client';
import { Component } from './tsx';

const appElement = document.getElementById('app');
const root = createRoot(appElement!);

root.render(<Component />);

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import './variables.css';
import 'normalize.css';
import Note from './pages/Note';

function App() {
    return (
        <Note />
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    // eslint-disable-next-line no-console
    console.error('root is not found');
}

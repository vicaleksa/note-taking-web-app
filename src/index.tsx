import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import 'normalize.css';

function App() {
    return (
        <p>All Notes</p>
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

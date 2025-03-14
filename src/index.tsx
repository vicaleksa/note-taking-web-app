import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import 'normalize.css';
import './variables.css';
import './index.css';
import Layout from './components/Layout';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Notes />} />
                    <Route path="/:id" element={<NoteDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
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

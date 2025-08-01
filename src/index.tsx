import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import 'normalize.css';
import './variables.css';
import './index.css';
import Layout from './components/Layout';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Search from './pages/Search';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Notes />} />
                    <Route path="/new" element={<NoteDetail create />} />
                    <Route path="/:id" element={<NoteDetail />} />

                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:id" element={<NoteDetail />} />

                    <Route path="/archive" element={<Notes showArchive />} />
                    <Route path="/archive/:id" element={<NoteDetail archived />} />

                    <Route path="/tags" element={<Notes showTagsOverview />} />
                    <Route path="/tags/:tagId" element={<Notes showNotesByTag />} />
                    <Route path="/tags/:tagId/:id" element={<NoteDetail />} />
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
    console.error('root is not found');
}

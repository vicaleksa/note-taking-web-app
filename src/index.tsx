import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { FontProvider } from './contexts/FontContext';
import 'normalize.css';
import './variables.css';
import './index.css';
import Layout from './components/Layout';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Search from './pages/Search';
import Archive from './pages/Archive';
import TagsOverview from './pages/TagsOverview';
import NotesByTag from './pages/NotesByTag';
import Settings from './pages/Settings';
import ColorTheme from './pages/ColorTheme';
import FontTheme from './pages/FontTheme';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Notes /> },

            { path: 'new', element: <NoteDetail create /> },
            { path: ':id', element: <NoteDetail /> },

            {
                path: 'search',
                children: [
                    { index: true, element: <Search /> },
                    { path: ':id', element: <NoteDetail /> },
                ],
            },

            {
                path: 'archive',
                children: [
                    { index: true, element: <Archive /> },
                    { path: ':id', element: <NoteDetail archived /> },
                ],
            },

            {
                path: 'tags',
                children: [
                    { index: true, element: <TagsOverview /> },
                    { path: ':tagId', element: <NotesByTag /> },
                    { path: ':tagId/:id', element: <NoteDetail /> },
                ],
            },

            {
                path: 'settings',
                children: [
                    { index: true, element: <Settings />, handle: { title: 'Settings' } },
                    { path: 'theme', element: <ColorTheme /> },
                    { path: 'font', element: <FontTheme /> },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider>
            <FontProvider>
                <RouterProvider router={router} />
            </FontProvider>
        </ThemeProvider>
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

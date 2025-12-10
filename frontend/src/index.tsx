import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { FontProvider } from './contexts/FontContext';
import 'normalize.css';
import './variables.css';
import './index.css';
import Layout from './components/Layout';
import NoteDetail from './pages/NoteDetail';
import Search from './pages/Search';
import SettingsOverview from './pages/SettingsOverview';
import ColorTheme from './pages/ColorTheme';
import FontTheme from './pages/FontTheme';
import SettingsLayout from './pages/SettingsLayout';
import NotesLayout from './pages/NotesLayout';
import ResponsiveNotes from './components/ResponsiveNotes';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
    {
        path: 'register',
        element: <SignUp />,
    },
    {
        path: '/',
        element: <Layout />,
        handle: { title: 'All Notes' },
        children: [
            {
                path: '/',
                element: <NotesLayout />,
                children: [
                    {
                        index: true,
                        element: null,
                        handle: { title: 'All Notes' },
                    },
                    {
                        path: 'new',
                        element: <NoteDetail create key="new" />,
                        handle: { title: 'All Notes' },
                    },
                    {
                        path: ':id',
                        element: <NoteDetail />,
                        handle: { title: 'All Notes' },
                    },
                ],
            },

            {
                path: 'search',
                children: [
                    { index: true, element: <Search /> },
                    { path: ':id', element: <NoteDetail /> },
                ],
            },

            {
                path: 'archive',
                element: <NotesLayout archived />,
                children: [
                    {
                        index: true,
                        element: null,
                        handle: { title: 'Archived Notes' },
                    },
                    {
                        path: ':id',
                        element: <NoteDetail archived />,
                        handle: { title: 'Archived Notes' },
                    },
                ],
            },

            {
                path: 'tags',
                element: <NotesLayout tags />,
                handle: { title: 'Notes Tagged:' },
                children: [
                    {
                        index: true,
                        element: null,
                        handle: { title: 'Notes Tagged:' },
                    },
                    {
                        path: ':tagId',
                        element: <ResponsiveNotes />,
                        handle: { title: 'Notes Tagged:' },
                    },
                    {
                        path: ':tagId/:id',
                        element: <NoteDetail />,
                        handle: { title: 'Notes Tagged:' },
                    },
                ],
            },

            {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                    { index: true, element: <SettingsOverview /> },
                    { path: 'theme', element: <ColorTheme />, handle: { title: 'Settings' } },
                    { path: 'font', element: <FontTheme />, handle: { title: 'Settings' } },
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

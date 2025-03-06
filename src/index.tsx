import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import './variables.css';
import 'normalize.css';
import Button from './components/Button';
import PageHeader from './components/PageHeader';
import TextInput from './components/TextInput';
import FAB from './components/FloatingActionButton';

function App() {
    return (
        <>
            <PageHeader />
            <TextInput
                name="inputName"
                title="Change Label"
                placeholder="Placeholder text"
                leftIcon="show"
                rightIcon="show"
                hintIcon="info"
                hintText="This is a hint text to help user."
            />
            <FAB size="small" ariaLabel="add" icon="plus" />
            <FAB size="large" ariaLabel="add" icon="plus" />
            <Button variant="primary" buttonText="Primary Button" leftIcon="show" />
            <Button variant="secondary" buttonText="Secondary Button" leftIcon="show" />
            <Button variant="outlined" buttonText="Outlined Button" leftIcon="show" />
        </>
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

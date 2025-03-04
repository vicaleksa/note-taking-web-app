import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import './variables.css';
import 'normalize.css';
import Button from './components/Button';
import PageHeader from './components/PageHeader';
import FAB from './components/FloatingActionButton';
import iconShow from './assets/images/icon-show-password.svg';
import iconPlus from './assets/images/icon-plus.svg';

function App() {
    return (
        <>
            <PageHeader />
            <FAB size="small" ariaLabel="add" icon={<img src={iconPlus} alt="" className="FABicon" />} />
            <FAB size="large" ariaLabel="add" icon={<img src={iconPlus} alt="" className="FABicon" />} />
            <Button variant="primary" buttonText="Primary Button" />
            <Button variant="secondary" buttonText="Secondary Button" />
            <Button
                variant="outlined"
                buttonText="Outlined Button"
                leftIcon={<img src={iconShow} alt="" className="buttonIcon" />}
            />
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

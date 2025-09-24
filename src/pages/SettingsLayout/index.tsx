import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import SettingsOverview from '../SettingsOverview';
import styles from './style.module.css';
import useBreakpointType from '../../hooks/useBreakpointType';

export default function SettingsLayout() {
    const breakpointType = useBreakpointType();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (breakpointType === 'desktop'
            && location.pathname === '/settings'
        ) {
            navigate('theme', { replace: true });
        }
    }, [breakpointType, location.pathname, navigate]);

    return (
        <div className={styles.settingsLayout}>
            {breakpointType === 'desktop' && (
                <div className={styles.settingsOverview}>
                    <SettingsOverview />
                </div>
            )}
            <div className={styles.settingsOption}>
                <Outlet />
            </div>
        </div>
    );
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import MenuItem from '../../components/MenuItem';
import styles from './style.module.css';
import Button from '../../components/Button';
import logout from '../../api/logout';

export default function SettingsOverview() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();
            navigate('/login', { replace: true });
        },
    });

    return (
        <>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.menu}>
                <MenuItem
                    link="/settings/theme"
                    leftIcon="sun"
                    text="Color Theme"
                />
                <MenuItem
                    link="/settings/font"
                    leftIcon="font"
                    text="Font Theme"
                />
                <MenuItem
                    link="/settings/password"
                    leftIcon="lock"
                    text="Change Password"
                />
                <div className={styles.divider} aria-hidden="true" />
                <div className={styles.buttonContainer}>
                    <Button
                        variant="ghost"
                        buttonText="Logout"
                        leftIcon="logout"
                        onClick={() => { mutation.mutate(); }}
                        disabled={mutation.isPending}
                    />
                </div>
            </div>
        </>
    );
}

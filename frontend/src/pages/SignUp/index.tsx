import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import Button from '../../components/Button';
import IconLogo from '../../components/Icons/IconLogo';
import Input from '../../components/Input';
import styles from './style.module.css';

type FormInputs = {
    email: string,
    password: string,
}

const formSchema = object({
    email: string().email().required(),
    password: string().min(6).required(),
});

export default function SignUp() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });
    const onSubmit = handleSubmit((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    });

    return (
        <div className={styles.background}>
            <div className={styles.tile}>
                <IconLogo />
                <h1 className={styles.header}>Create Your Account</h1>
                <p className={styles.description}>
                    Sign up to start organizing your notes and boost your productivity.
                </p>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form onSubmit={onSubmit} className={styles.form} noValidate>
                    <Input
                        {...register('email')}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        errorMessage={errors.email && errors.email.message}
                        type="email"
                        label="Email Address"
                        placeholder="email@example.com"
                    />
                    <Input
                        {...register('password')}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        errorMessage={errors.password && errors.password.message}
                        type="password"
                        label="Password"
                        placeholder=""
                    />
                    <Button variant="primary" buttonText="Sign up" type="submit" />
                </form>
                <div className={styles.loginContainer}>
                    <p className={styles.description}>Already have an account?</p>
                    <Button variant="accentGhost" buttonText="Login" />
                </div>
            </div>
        </div>
    );
}

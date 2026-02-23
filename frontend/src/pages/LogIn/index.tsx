import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import Button from '../../components/Button';
import IconLogo from '../../components/Icons/IconLogo';
import Input from '../../components/Input';
import styles from './style.module.css';
import LinkButton from '../../components/LinkButton';
import login from '../../api/login';

const formSchema = object({
    email: string().email().required(),
    password: string().min(6).required(),
});

type FormInputs = InferType<typeof formSchema>;

export default function LogIn() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const mutation = useMutation({
        mutationFn: login,
    });

    const onSubmit = (data: FormInputs) => {
        mutation.mutate(data);
    };

    return (
        <div className={styles.background}>
            <div className={styles.tile}>
                <IconLogo />
                <h1 className={styles.header}>Welcome to Notes</h1>
                <p className={styles.description}>
                    Please log in to continue
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
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
                    {mutation.isError ? (<p className={styles.errorMessage}>{mutation.error.message}</p>) : null}
                    <Button
                        variant="primary"
                        buttonText={mutation.isPending ? 'Logging in' : 'Log in'}
                        type="submit"
                        disabled={mutation.isPending}
                    />
                </form>
                <div className={styles.loginContainer}>
                    <p className={styles.description}>No account yet?</p>
                    <LinkButton href="/register" variant="accent">
                        Sign up
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}

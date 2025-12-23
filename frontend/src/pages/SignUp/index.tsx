import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import Button from '../../components/Button';
import IconLogo from '../../components/Icons/IconLogo';
import Input from '../../components/Input';
import styles from './style.module.css';
import LinkButton from '../../components/LinkButton';
import registerUser from '../../api/registerUser';

const formSchema = object({
    email: string().email().required(),
    password: string().min(6).required(),
});

type FormInputs = InferType<typeof formSchema>;

export default function SignUp() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });

    const mutation = useMutation({
        mutationFn: registerUser,
    });

    const onSubmit = (data: FormInputs) => {
        mutation.mutate(data);
    };

    return (
        <div className={styles.background}>
            <div className={styles.tile}>
                <IconLogo />
                <h1 className={styles.header}>Create Your Account</h1>
                <p className={styles.description}>
                    Sign up to start organizing your notes and boost your productivity.
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
                        placeholder="At least 6 characters"
                    />
                    {mutation.isError ? (<p className={styles.errorMessage}>{mutation.error.message}</p>) : null}
                    <Button
                        variant="primary"
                        buttonText={mutation.isPending ? 'Signing up' : 'Sign up'}
                        type="submit"
                        disabled={mutation.isPending}
                    />
                </form>
                <div className={styles.loginContainer}>
                    <p className={styles.description}>Already have an account?</p>
                    <LinkButton href="/login" variant="accent">
                        Login
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}

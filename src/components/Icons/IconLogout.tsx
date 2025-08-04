import { IconProps } from './types';

export default function IconLogout({ className }: IconProps) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.9999 11.9985H8.94531M20.9999 11.9985L18.0684 9.06445M20.9999 11.9985L18.0684 14.9337"
            />
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.5555 8.26646V7.25084C14.5555 5.69124 13.4349 4.35979 11.905 4.10159L6.70237 3.04487C4.7651
                2.71792 3 4.21932 3 6.19412V17.8059C3 19.7807 4.76509 21.2821 6.70236 20.9551L11.905 19.8984C13.4349
                19.6402 14.5555 18.3088 14.5555 16.7492V15.7346"
            />
        </svg>
    );
}

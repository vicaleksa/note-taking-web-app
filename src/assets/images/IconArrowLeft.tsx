type iconProps = {
    className: string;
}

export default function IconArrowLeft({ className }:iconProps) {
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
                fill="currentColor"
                fillRule="evenodd"
                d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

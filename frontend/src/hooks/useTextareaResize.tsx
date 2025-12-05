import { useEffect } from 'react';

const useTextareaResize = (ref: React.RefObject<HTMLTextAreaElement | null>, dep: string) => {
    useEffect(() => {
        const el = ref.current;
        if (el) {
            el.style.height = 'auto'; // without it the textarea won't shrink back after text is removed
            el.style.height = `${String(el.scrollHeight)}px`;
        }
    }, [ref, dep]);
};

export default useTextareaResize;

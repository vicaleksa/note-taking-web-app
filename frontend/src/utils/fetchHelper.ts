type ApiError = {
    error?: string,
}

const fetchHelper = async <T = unknown>(
    path: string,
    options?: RequestInit,
    errorMessage?: string,
): Promise<T> => {
    const response = await fetch(
        `http://localhost:8000/api/${path}`,
        {
            ...options,
            credentials: 'include',
        },
    );

    let data: unknown;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const err = data as ApiError;
        throw new Error(err.error || errorMessage || 'Request failed');
    }

    return data as T;
};

export default fetchHelper;

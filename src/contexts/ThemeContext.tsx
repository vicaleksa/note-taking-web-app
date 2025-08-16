import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    PropsWithChildren,
    useRef,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    theme: Theme,
    switchTheme: (themeMode: Theme) => void,
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    switchTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>('light');
    const themeMediaQueryRef = useRef(window.matchMedia('(prefers-color-scheme: dark)'));

    useEffect(() => {
        let savedTheme = localStorage.getItem('theme');
        if (savedTheme === null) {
            savedTheme = 'light';
        }
        if (savedTheme === 'system') {
            savedTheme = themeMediaQueryRef.current.matches ? 'dark' : 'light';
            setTheme('system');
        } else {
            setTheme(savedTheme as Theme);
        }
        document.body.className = savedTheme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const themeMediaQuery = themeMediaQueryRef.current;
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (theme !== 'system') {
                return;
            }
            document.body.className = event.matches ? 'dark' : 'light';
        };

        themeMediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            themeMediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]);

    const switchTheme = useCallback((themeMode: Theme) => {
        setTheme(themeMode);
        localStorage.setItem('theme', themeMode);

        if (themeMode === 'system') {
            document.body.className = themeMediaQueryRef.current.matches ? 'dark' : 'light';
        } else {
            document.body.className = themeMode;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo(
        () => ({ theme, switchTheme }),
        [theme, switchTheme],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

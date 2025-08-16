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
import clearClassNames from '../utils/clearClassNames';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
    theme: Theme,
    switchTheme: (themeMode: Theme) => void,
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    switchTheme: () => {},
});

const themes = ['light', 'dark', 'system'];

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
        clearClassNames(document.body, themes);
        document.body.classList.add(savedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const themeMediaQuery = themeMediaQueryRef.current;
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (theme !== 'system') {
                return;
            }
            clearClassNames(document.body, themes);
            const className = event.matches ? 'dark' : 'light';
            document.body.classList.add(className);
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
            clearClassNames(document.body, themes);
            const className = themeMediaQueryRef.current.matches ? 'dark' : 'light';
            document.body.classList.add(className);
        } else {
            clearClassNames(document.body, themes);
            document.body.classList.add(themeMode);
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

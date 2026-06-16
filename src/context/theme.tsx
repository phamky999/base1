import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const THEME_VALUES: Theme[] = ['dark', 'light', 'system'];

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false;
  }

  return THEME_VALUES.includes(value as Theme);
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return 'dark';
  }

  return 'light';
}

let transitionTimeoutId: number | null = null;
function disableTransitionsTemporarily() {
  let style = document.getElementById(
    'disable-transitions-style'
  ) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = 'disable-transitions-style';
    style.appendChild(
      document.createTextNode(
        '*,*::before,*::after{-webkit-transition:none!important;transition:none!important}'
      )
    );
    document.head.appendChild(style);
  } else if (!document.head.contains(style)) {
    document.head.appendChild(style);
  }

  return () => {
    window.getComputedStyle(document.body);
    if (transitionTimeoutId) cancelAnimationFrame(transitionTimeoutId);

    transitionTimeoutId = requestAnimationFrame(() => {
      transitionTimeoutId = requestAnimationFrame(() => {
        if (style && style.parentNode) {
          style.remove();
        }
      });
    });
  };
}

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (isTheme(storedTheme)) {
      return storedTheme;
    }

    return defaultTheme;
  });

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme);
      setThemeState(nextTheme);
    },
    [storageKey]
  );

  const applyTheme = useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement;
      const resolvedTheme =
        nextTheme === 'system' ? getSystemTheme() : nextTheme;
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null;

      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);

      if (restoreTransitions) {
        restoreTransitions();
      }
    },
    [disableTransitionOnChange]
  );

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = () => {
      applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return;
      }

      if (event.key !== storageKey) {
        return;
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue);
        return;
      }

      setThemeState(defaultTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [defaultTheme, storageKey]);

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? getSystemTheme() : theme;

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

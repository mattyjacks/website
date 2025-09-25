"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

export type ClientThemeContextValue = {
  mounted: boolean;
  theme: string | undefined;
  isDark: boolean;
};

const ClientThemeContext = createContext<ClientThemeContextValue | undefined>(undefined);

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const value = useMemo<ClientThemeContextValue>(() => {
    const isDark = resolvedTheme === "dark";
    return { mounted, theme: resolvedTheme, isDark };
  }, [mounted, resolvedTheme]);

  return (
    <ClientThemeContext.Provider value={value}>
      {mounted ? children : null}
    </ClientThemeContext.Provider>
  );
}

export function useClientTheme(): ClientThemeContextValue {
  const ctx = useContext(ClientThemeContext);
  if (!ctx) {
    // If used outside provider, assume not mounted yet and light theme
    return { mounted: false, theme: undefined, isDark: false };
  }
  return ctx;
}

// Convenience wrapper that provides the context and renders only after mount.
// Usage:
// <WithClientTheme>{({ isDark }) => (<YourComponent ... />)}</WithClientTheme>
export function WithClientTheme({
  children,
}: {
  children: (theme: ClientThemeContextValue) => React.ReactNode;
}) {
  return (
    <ClientThemeProvider>
      <Inner>{children}</Inner>
    </ClientThemeProvider>
  );
}

function Inner({ children }: { children: (theme: ClientThemeContextValue) => React.ReactNode }) {
  const value = useClientTheme();
  if (!value.mounted) return null;
  return <>{children(value)}</>;
}

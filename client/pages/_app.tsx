import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {createTheme, NextUIProvider, useTheme} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ApplicationLayout from '../layout';
import {lightTheme, darkTheme} from '../theme/index';
  

const appLightTheme = createTheme(lightTheme);

const appDarkTheme = createTheme(darkTheme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: appLightTheme.className,
        dark: appDarkTheme.className,
      }}
    >
      <NextUIProvider>
        <ApplicationLayout>
          <Component {...pageProps} />
        </ApplicationLayout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {createTheme, NextUIProvider} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ApplicationLayout from '../layout';
import {lightTheme, darkTheme} from '../theme/index';
import {Provider} from 'react-redux';
import { persistor, store, saga } from '../store'; 
import { SSRProvider } from "@react-aria/ssr";
import rootSaga from '../store/saga';
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const appLightTheme = createTheme(lightTheme);

const appDarkTheme = createTheme(darkTheme);

saga.run(rootSaga);

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
        <SSRProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ApplicationLayout>
                <Component {...pageProps} />
              </ApplicationLayout>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
              />
            </PersistGate>
          </Provider>
        </SSRProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;

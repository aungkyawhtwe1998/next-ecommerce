import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/AuthWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Provider>
    </SessionProvider>
  );
}

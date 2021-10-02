import UserProvider from "../context/userContext";
import { ThemeProvider } from "next-themes";
import { Provider } from "next-auth/client";
import "../styles/global.css";

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider session={pageProps.session}>
        <ThemeProvider defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}

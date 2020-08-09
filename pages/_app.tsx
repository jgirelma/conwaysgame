import "../styles/global.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "@chakra-ui/core";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Conway's Game of Life</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <ThemeProvider>
        <div className="font-sans">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

import "../styles/globals.css";
import Provider from "../context/PersonContext";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider >
      <Head>
        <title>Star Wars</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

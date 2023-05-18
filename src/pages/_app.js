import "../styles/globals.css";
import Provider from "../context/PersonContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

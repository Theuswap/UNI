import '../public/styles.css';
import { AppProvider } from '../context/AppContext';
import { MoralisProvider } from "react-moralis";
const APP_ID = "tmaPMGyz9Mksp6zcdqsG5sLiKUWdYupJAxSkG5q1";
const SERVER_URL = "https://pgl6znodo88m.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider 
            appId={APP_ID}
            serverUrl={SERVER_URL}
        >
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </MoralisProvider>
    );
}

export default MyApp;
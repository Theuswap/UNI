import '../public/styles.css';
import TagManager from 'react-gtm-module';
import { AppProvider } from '../context/AppContext';
import { MoralisProvider } from "react-moralis";
import { useEffect } from 'react';
const APP_ID = "tmaPMGyz9Mksp6zcdqsG5sLiKUWdYupJAxSkG5q1";
const SERVER_URL = "https://pgl6znodo88m.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {

    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-TMM7VT8' });
    }, []);


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
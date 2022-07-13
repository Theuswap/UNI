import Head from "next/head"
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
        <Head>
          <meta charSet="utf-8" />
          <title>Uniswap Interface</title>
          <meta name="description" content="Swap or provide liquidity on the Uniswap Protocol" />
          <link rel="shortcut icon" type="image/png" href="<%=baseURL%>/static/favicon.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="<%=baseURL%>/static/images/192x192_App_Icon.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="<%=baseURL%>/static/images/512x512_App_Icon.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
          <meta name="theme-color" content="#ff007a" />
          <link rel="preload" href="<%=baseURL%>/static/fonts/Inter-roman.var.woff2" as="font" type="font/woff2" crossOrigin="" />
        </Head>

        <Navbar />

        <div className="container-fluid">
            {children}
        </div>
    </>
  )
}

export default Layout
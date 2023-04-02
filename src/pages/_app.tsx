import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>TonTwitter</title>
        <meta name="description" content="TonTwitter APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-right" />

      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

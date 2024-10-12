"use client"; 

import { usePathname } from "next/navigation";
import SessionProviderWrapper from "./SessionProviderWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/", "/login", "/register", "/auth/signin", "/auth/signup"];  
  const showLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <Head>
        <title>Blood Donation App</title>
        <meta name="description" content="Donate blood and save lives" />
      </Head>
      <body>
        <SessionProviderWrapper>
          {showLayout && <Header />}
          <main>{children}</main>
          {showLayout && <Footer />}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

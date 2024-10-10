import SessionProviderWrapper from "./SessionProviderWrapper"; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 

export const metadata = {
  title: "Blood Donation App",
  description: "Donate blood and save lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Header /> 
          <main>{children}</main> 
          <Footer /> 
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

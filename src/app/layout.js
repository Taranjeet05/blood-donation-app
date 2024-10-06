import SessionProviderWrapper from "./SessionProviderWrapper"; 

export const metadata = {
  title: "Blood Donation App",
  description: "Donate blood and save lives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}

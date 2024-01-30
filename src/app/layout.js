import "./globals.css";
import "./assets/css/signup-variables.css";
import "./assets/css/signup.css";
import "./assets/css/dashboard.css";

export const metadata = {
  title: "Dochyve",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
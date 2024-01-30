import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function Layout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <head>
        <title>Frontend</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

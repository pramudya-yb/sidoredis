import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidomulyo Redis 2026",
  description: "Formulir pengambilan data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon-huruf.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
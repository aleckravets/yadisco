import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: "Yadisco",
  description: "Yadisco - Музыка с Яндекс Диска",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </StoreProvider>
  );
}

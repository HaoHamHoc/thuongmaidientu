import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <body
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <AntdRegistry>
          <SessionProvider>
            {children}
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";
import classnames from "classnames";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={classnames(inter.variable,)}>
          <Theme accentColor="blue" radius="large" appearance="dark">
            <main className="p-5">{children}</main>
          </Theme>
        </body>
      </html>
    </SessionProvider>
  );
}

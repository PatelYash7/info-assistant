import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const ManropeSans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Info Assistant",
  description: "Assistant which reads an page for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ManropeSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

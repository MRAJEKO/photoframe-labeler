import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photoframe Labeler",
  description: "Add a description to each image in the photoframe gallery",
  icons: [
    {
      url: "/icons/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    {
      url: "/icons/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      url: "/icons/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/icons/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/icons/android-chrome-192x192.png",
      rel: "icon",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/icons/android-chrome-512x512.png",
      rel: "icon",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

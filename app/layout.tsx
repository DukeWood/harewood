import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harewood Village Hall | At the heart of the village",
  description:
    "Hire Harewood Village Hall, discover community events, and explore Harewood village history and local life with Red Kite.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

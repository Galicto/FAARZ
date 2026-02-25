import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAARZ — Admin Dashboard",
  description: "Proximity-Based Surplus Food Redistribution Platform — Admin Control Panel",
  keywords: ["food waste", "redistribution", "NGO", "admin", "FAARZ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        {children}
      </body>
    </html>
  );
}

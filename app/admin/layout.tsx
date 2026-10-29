import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "./admin.css";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tööaeg · Чаты",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.png" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={satoshi.variable}>
      <body className="admin-body">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "@fontsource/rozha-one";
import "@fontsource-variable/jost";
import "./globals.css";
import { wedding } from "@/data/wedding";

const title = `${wedding.partner1} & ${wedding.partner2} — Wedding invitation`;
const description = `${wedding.inviteTop}, ${wedding.partner1} and ${wedding.partner2} ${wedding.inviteBottom}. ${wedding.displayDate}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#3d0817",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

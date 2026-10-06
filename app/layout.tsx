import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://poerator.com"),
  title: { default: "Poerator | Live Production Across Europe", template: "%s | Poerator" },
  description: "Broadcast-grade live production, OB Van hire and equipment rental across Europe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

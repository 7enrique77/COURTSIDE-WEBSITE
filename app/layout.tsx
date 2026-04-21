import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Courtside Vending | Tennis Ball & Accessory Vending Machines",
  description:
    "Courtside Vending places premium vending machines at tennis courts and clubs — stocked with tennis balls and accessories, available 24/7. Partner with us today.",
  keywords: [
    "courtside vending",
    "tennis vending machine",
    "tennis ball vending",
    "tennis court vending",
    "tennis accessories vending",
    "vending machine tennis club",
  ],
  metadataBase: new URL("https://courtsidevend.com"),
  alternates: {
    canonical: "https://courtsidevend.com",
  },
  openGraph: {
    title: "Courtside Vending | Tennis Ball & Accessory Vending Machines",
    description:
      "Premium vending machines at tennis courts — stocked with tennis balls and accessories, available 24/7.",
    url: "https://courtsidevend.com",
    siteName: "Courtside Vending",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courtside Vending | Tennis Ball & Accessory Vending Machines",
    description:
      "Premium vending machines at tennis courts — stocked with tennis balls and accessories, available 24/7.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

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
  title: "Courtside Vending — Elevating the Court Experience",
  description:
    "Premium vending solutions for tennis facilities. Tennis balls, hydration, and more — always courtside.",
  openGraph: {
    title: "Courtside Vending",
    description: "Premium vending solutions for tennis facilities.",
    type: "website",
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

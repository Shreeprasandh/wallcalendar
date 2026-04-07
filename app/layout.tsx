import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar – Interactive Date Planner",
  description: "A beautifully designed interactive wall calendar with day range selection, notes, holiday markers, and theme switching.",
  keywords: ["calendar", "interactive", "date range", "notes", "planner"],
  authors: [{ name: "Wall Calendar App" }],
  openGraph: {
    title: "Wall Calendar – Interactive Date Planner",
    description: "A beautifully designed interactive wall calendar component",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

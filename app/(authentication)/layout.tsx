import type { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: "Shopies",
  description:
    "Checkout high quality products online. Buy at great offers and get them delivered on time once you order.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="p-5 h-screen w-full flex justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}

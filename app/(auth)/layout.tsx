import type { Metadata } from "next";
import "../globals.css";
import MainHeader from "@/components/main-header";
import { verifyAuthSession } from "@/lib/auth";
import { getUserById } from "@/lib/store_actions";
export const metadata: Metadata = {
  title: "Shopies",
  description:
    "Checkout high quality products online. Buy at great offers and get them delivered on time once you order.",
};

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await verifyAuthSession();
  let user;
  if (result && result.user?.id) {
    user = await getUserById(result.user.id);
  }
  return (
    <html lang="en">
      <body>
        <MainHeader user={user} />
        <div className="w-full px-5 sm:px-10 pt-72 sm:pt-44 flex sm:gap-10">
          {children}
        </div>
      </body>
    </html>
  );
}

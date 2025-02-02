import type { Metadata } from "next";
import MainHeader from "@/components/main-header";
import { getUser } from "@/lib/actions";
import { AppProvider } from "@/hooks/useAppContext";
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
  const user = await getUser();
  return (
    <AppProvider initialUser={user}>
      <MainHeader user={user} />
      <div className="w-full px-5 sm:px-10 pt-72 sm:pt-44 flex sm:gap-10">
        {children}
      </div>
    </AppProvider>
  );
}

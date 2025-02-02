"use client";
import ProductsGrid from "@/components/products_grid";
import SideNavigation from "@/components/side-menu";
import { useStore } from "@/hooks/useStore";
import { useAppContext } from "@/hooks/useAppContext";
export default function Home() {
  const appContext = useAppContext();
  const { user } = appContext;
  const { data: products, isLoading, error } = useStore(+user.id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="hidden sm:flex">
        <SideNavigation />
      </div>
      <main className="flex-1">
        <h1 className="text-lg font-bold flex justify-end font-mono">
          You might like
        </h1>
        <ProductsGrid products={products} />
        <h2>More</h2>
      </main>
    </>
  );
}

import ProductsGrid from "@/components/products_grid";
import { getAllProducts } from "@/lib/store_actions";
import SideNavigation from "@/components/side-menu";
export default function Home() {
  const products = getAllProducts();
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

import { getAllProducts } from "@/lib/store_actions";
import ProductsGrid from "@/components/products_grid";
export default async function Layout({ children }) {
  const products = await getAllProducts();
  return (
    <div className="flex flex-col">
      {children}
      <section className="pt-10 space-y-2">
        <h1 className="flex justify-end font-bold text-lg">Similar products</h1>
        <ProductsGrid products={products} />
      </section>
    </div>
  );
}

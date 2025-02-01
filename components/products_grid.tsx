import ProductItem from "./product_item";
import classes from "./products_grid.module.css";
export default function ProductsGrid({ products }) {
  return (
    <section
      className={`${classes.products} transition-all duration-300 w-full flex justify-end`}
    >
      <ul className="transition-all duration-300">
        {products.map((product) => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </ul>
    </section>
  );
}

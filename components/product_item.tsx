import classes from "./product_item.module.css";
import Link from "next/link";
export default function ProductItem({ product }) {
  return (
    <Link href={`/${product.slug}`} className={classes.product}>
      <img src={`images/${product.image}`} alt={product.name} />
      <section className={classes.description}>
        <h1 className="font-mono">{product.name}</h1>
        <h1 className="font-thin text-gray-400 text-sm">{product.price}</h1>
        <span className="text-sm">{product.in_stock} units left</span>
      </section>
    </Link>
  );
}

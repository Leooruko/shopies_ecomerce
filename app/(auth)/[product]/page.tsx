import { getProduct } from "@/lib/store_actions";
import Image from "next/image";
import classes from "./product-item.module.css";
import Link from "next/link";

export default function ProductDetailsPage({ params }) {
  const slug = params.product;
  const product = getProduct(slug);
  return (
    <>
      <div
        className={`${classes.product_item} text-white flex flex-col sm:flex-row justify-between gap-5 rounded-md max-h-fit  sm:max-h-96 md:max-h-72 p-7 items-start `}
      >
        <img
          src={`/images${product!.image}`}
          className={`${classes.image} `}
          alt={product!.slug}
        />
        <section className="flex flex-col gap-10 sm:gap-5 h-full text-black max-h-fit   sm:overflow-hidden ">
          <h1 className="text-2xl  font-mono text-blue-500">{product?.name}</h1>
          <p className="text-sm text-gray-700 font-sans italic">
            {product?.description}
          </p>
          <div className="actions flex justify-between gap-10 ">
            {/* <button className="bg-red-600 p-2 rounded-sm font-bold text-white w-full sm:w-fit">
              ADD TO CART
            </button> */}
            <Link
              href={"/checkout"}
              className="rounded-sm flex items-center  bg-red-600 px-5 text-white "
            >
              ORDER
            </Link>
            <span className="bg-white flex w-full sm:w-fit rounded-md">
              <h1 className="w-full flex items-center border-2 border-green-600 rounded-l-md px-5">
                12
              </h1>
              <button className="bg-green-600 border-2 border-green-600 p-2 rounded-r-sm font-bold text-white w-fit px-5">
                +
              </button>
            </span>
            {/* <button className="bg-blue-400 p-2 rounded-sm">BUY</button> */}
          </div>
        </section>
      </div>
    </>
  );
}

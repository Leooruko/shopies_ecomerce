// import Image from "next/image";
"use client";
import { useAddQuantity, useAddToCart } from "@/hooks/useStore";
import classes from "./productSingleCard.module.css";
import { useAppContext } from "@/hooks/useAppContext";
import Link from "next/link";
import Image from "next/image";
export default function ProductSingleCard({ product }) {
  const { user } = useAppContext() || {};
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddoCart = () => {
    if (user?.id && product.id) {
      addToCart({
        userId: +user.id,
        productId: product.id,
        slug: product.slug,
      });
    }
  };
  const { mutate: addItemQuantity, isLoading } = useAddQuantity();
  const handleAddQuantity = () => {
    if (user?.id && (product.id || product.product_id)) {
      addItemQuantity({
        user_id: +user.id,
        product_id: +product.product_id || +product.id,
        id: product.id || null,
        slug: product.slug as string,
      });
    }
    console.log("Passed");
  };
  return (
    <div
      className={`${classes.product_item} text-white flex flex-col sm:flex-row justify-between gap-5 rounded-md max-h-fit w-full  sm:max-h-96 md:max-h-72 p-7 items-start `}
    >
      <div className=" h-full min-h-52 aspect-auto min-w-52 relative -z-50">
        <Image
          src={`/images${product!.image}`}
          className={`${classes.image} `}
          alt={product?.name || "Product Image"}
          fill
        />
      </div>
      <section className="flex flex-col gap-10 sm:gap-5 h-full text-black  justify-evenly  sm:overflow-hidden ">
        <h1 className="text-2xl  font-mono text-blue-500">{product?.name}</h1>
        <p className="text-sm text-gray-700 font-sans italic">
          {product?.description}
        </p>
        <div className="actions flex justify-between gap-10 ">
          {product.quantity || product.inCart ? (
            <>
              {!product.cart_id && (
                <Link
                  href={"/checkout"}
                  className="rounded-sm flex items-center  bg-red-600 px-5 text-white "
                >
                  ORDER
                </Link>
              )}
              <span className="bg-white flex w-full sm:w-fit rounded-md">
                <h1 className="w-full flex items-center border-2 border-green-600 rounded-l-md px-5">
                  {product.quantity && product.quantity}
                  {product.inCart && product.inCart}
                </h1>
                <button
                  onClick={handleAddQuantity}
                  disabled={isLoading}
                  className="bg-green-600 border-2 border-green-600 p-2 rounded-r-sm font-bold text-white w-fit px-5"
                >
                  +
                </button>
              </span>
            </>
          ) : (
            <button
              onClick={handleAddoCart}
              disabled={isPending}
              className="bg-red-600 p-2 rounded-sm font-bold text-white w-full sm:w-fit"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

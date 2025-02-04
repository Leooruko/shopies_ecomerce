// import Image from "next/image";
"use client";
import {
  useAddQuantity,
  useAddToCart,
  useReduceQuantity,
} from "@/hooks/useStore";
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
  const { mutate: deductItemQuantity, loadingDeduction } = useReduceQuantity();
  const handleDeductQuantity = () => {
    if (user?.id) {
      console.log("TRUTH");
      deductItemQuantity({
        id: product.cart_id,
        slug: product.slug as string,
        user_id: +user.id,
      });
    }
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
      <section className="flex flex-col gap-10 sm:gap-5 h-full text-black  justify-evenly  sm:overflow-hidden">
        <h1 className="text-2xl  font-mono text-blue-500">{product?.name}</h1>
        <p className="text-sm text-gray-700 font-sans italic">
          {product?.description}
        </p>
        <div className="actions flex justify-between gap-10 self-end">
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
              <span className=" flex w-full sm:w-fit rounded-md h-10 place-self-end">
                <button
                  onClick={handleDeductQuantity}
                  disabled={loadingDeduction}
                  className="border-2 p-2 font-bold text-red-600 w-fit px-5 hover:bg-gray-50 transition-all duration-300 hover:text-purple-600"
                >
                  -
                </button>
                <h1 className="w-full flex items-center border-2   px-5">
                  {product.quantity && product.quantity}
                  {product.inCart && product.inCart}
                </h1>
                <button
                  onClick={handleAddQuantity}
                  disabled={isLoading}
                  className="border-2 p-2 rounded-r-sm font-bold text-blue w-fit px-5  hover:bg-gray-50 transition-all duration-300 hover:text-green-600"
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

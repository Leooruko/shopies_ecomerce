"use client";
import { useCart } from "@/hooks/useStore";
import ProductSingleCard from "./productSingleCard";
interface CartProps {
  userId: string;
}

export default function CartQuery({ userId }: CartProps) {
  const { data: cart, isLoading, error } = useCart(userId);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="flex flex-col w-full sm:px-20 gap-10 mb-10">
      {cart.length > 0 ? (
        cart.map((item: { name: string; quantity: number }) => (
          <ProductSingleCard key={item.name} product={item} />
        ))
      ) : (
        <p>Cart is Empty</p>
      )}
    </div>
  );
}

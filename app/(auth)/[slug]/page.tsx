"use client";
import ProductSingleCard from "@/components/productSingleCard";
import { useAppContext } from "@/hooks/useAppContext";
import { useProduct } from "@/hooks/useStore";
import { useParams } from "next/navigation";
export default function ProductDetailsPage({}) {
  const params = useParams();
  const { slug } = params;
  const { user } = useAppContext();
  const { data: product, isLoading, error } = useProduct(user.id, slug);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <ProductSingleCard product={product} />
    </>
  );
}

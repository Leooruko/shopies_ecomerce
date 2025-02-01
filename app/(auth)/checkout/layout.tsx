import { ReactNode } from "react";

export default function CheckoutPage({
  delivery_details,
  payment_details,
  cart_details,
}: {
  delivery_details: ReactNode;
  payment_details: ReactNode;
  cart_details: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 w-full justify-between h-full max-h-screen">
      <h1 className="font-bold text-2xl">Checkout</h1>
      {cart_details}
      {delivery_details}
      {payment_details}
      <button className="bg-green-600 text-white p-4 rounded-md">
        Proceed to Pay
      </button>
    </div>
  );
}

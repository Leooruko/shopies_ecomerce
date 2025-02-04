import "./page.css";
import { getUser } from "@/lib/actions";
import CartQuery from "@/components/cart";
export default async function Cart() {
  const user = await getUser();
  if (user.id)
    return (
      <div className="flex flex-col sm:flex-row w-full  ">
        <section className="w-full sm:overflow-y-scroll sm:h-dvh sm:no-scrollbar">
          <CartQuery userId={user.id} />
        </section>
        <section className="sm:w-1/2 px-20 pt-20">
          <div>
            <h1>Account Details</h1>
            <button>Proceed to checkout</button>
          </div>
        </section>
      </div>
    );
}

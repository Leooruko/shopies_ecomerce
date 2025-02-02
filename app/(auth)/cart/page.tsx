import { getUser } from "@/lib/actions";
import CartQuery from "@/components/cart";
export default async function Cart() {
  const user = await getUser();
  if (user.id)
    return (
      <>
        <CartQuery userId={user.id} />
      </>
    );
}

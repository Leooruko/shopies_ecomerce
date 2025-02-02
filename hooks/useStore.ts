import { addItemQuantity, addToCart, deductItemQuantity, fetchCart, getAllProducts, getProduct, removeFromCart } from "@/lib/store_actions";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

export function useCart(userId:number){
    return useQuery({
        queryKey:['cart',userId],
        queryFn:()=> fetchCart(userId)
    })
}
export function useStore(user_id:number){
    return useQuery({
        queryKey:['store'],
        queryFn:()=>getAllProducts(user_id)
    })
}
export function useProduct(user_id:number,slug:string){
    return useQuery({
        queryKey:['product',slug,user_id],
        queryFn:()=>getProduct(slug,user_id)
    })
}
export function useAddToCart(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:async ({userId,productId,slug}:{userId:number;productId:number,slug:string})=>addToCart(userId,productId),
        onSuccess:(_,variables)=>{
            queryClient.invalidateQueries({queryKey:['cart',variables.userId]})
            queryClient.invalidateQueries({ queryKey: ['store'] }); // Invalidate store
            queryClient.invalidateQueries({ queryKey: ['product', variables.slug, variables.userId] });
        }
    })
}

export function useRemoveFromCart(){
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async(id:number)=>removeFromCart(id),
        onSuccess:(_,variables)=>{
            queryClient.invalidateQueries({queryKey:['cart']})
            queryClient.invalidateQueries({ queryKey: ['store'] }); // Invalidate store
            queryClient.invalidateQueries({ queryKey: ['product', variables.productId, variables.userId] });
        }
    })
}

export function useAddQuantity(){
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:async ({user_id,product_id,id,slug}:{user_id:number,product_id:number,id:number,slug:string})=>addItemQuantity(user_id,product_id,id),
        onSuccess:(_,variables)=>{
            queryClient.invalidateQueries({queryKey:['cart']})
            queryClient.invalidateQueries({ queryKey: ['store'] }); // Invalidate store
            queryClient.invalidateQueries({ queryKey: ['product', variables.slug, variables.user_id] });
        }
    })
}

export function useReduceQuantity(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:async(id:number)=>deductItemQuantity(id),
        onSuccess:(_,variables)=>{
            queryClient.invalidateQueries({queryKey:['cart']})
        }
    })
}
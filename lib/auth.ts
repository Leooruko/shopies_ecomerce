import { Lucia } from "lucia"
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite"
import sql from 'better-sqlite3';
import { cookies } from "next/headers";
const db = sql('store.db');
const adapter=new BetterSqlite3Adapter(db,{
    user:'users',
    session:'sessions'
})
const lucia=new Lucia(adapter,
    {
        sessionCookie:{
            expires:false,
            attributes:{
                secure:process.env.NODE_ENV==='production'
            }
        }
    }
)
export async function createAuthSession(userId:string){
    const session =await lucia.createSession(userId,{})
    const sessionCookie= lucia.createSessionCookie(session.id)
    const cookiesStore=cookies();
    (await cookiesStore).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes)
}
export async function verifyAuthSession(){
    const sessionCookie=(await cookies()).get(lucia.sessionCookieName)
    if(!sessionCookie){
        return false;
    }
    const session_id=sessionCookie.value;
    if(!session_id){
        return{
            user:null,
            session:null
        }
    }
    const result=await lucia.validateSession(session_id)
   try{
        if(result && result.session?.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes)
        }
        if(!result.session){
            const sessionCookie=lucia.createBlankSessionCookie();
            (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes)
            
        }
    }catch{}
    return result;

}
export async function destroySession(){
    const result=await verifyAuthSession();
    if(!result || !result.session){
        return {errors:'UnAuthorized'}
    }
    await lucia.invalidateSession(result.session.id)
    const sessionCookie=lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name,sessionCookie.value,sessionCookie.attributes)

}
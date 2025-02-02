"use server";
import { verifyAuthSession } from "@/lib/auth";
import { getUserById } from "@/lib/store_actions";
import sql from 'better-sqlite3';
const db=sql('store.db')

export async function queryData(searchQuery:string){    
    const results=await db.prepare(
        `
            SELECT * FROM products
            WHERE id IN (SELECT rowid FROM products_fts WHERE products_fts MATCH ?)
        `
    ).all(searchQuery);
    return results;
}

export async function getUser(){
      const result = await verifyAuthSession();
      let user;
      let id;
      if (result && result.user?.id) {
        id=result.user.id
        user = await getUserById(id);
      }
      return {user:user,id:id}
}
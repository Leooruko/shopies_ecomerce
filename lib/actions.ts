"use server";
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

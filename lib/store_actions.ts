import sql from 'better-sqlite3';
import { verifyAuthSession } from './auth';
import { redirect } from 'next/navigation';
const db=sql('store.db')
export function getAllProducts(){
    const data=db.prepare(
        `
            SELECT * FROM products;
        `
    ).all()    
    return data;
}

export function getProduct(slug:string){  
    const product=db.prepare(
        `
            SELECT * FROM products WHERE slug=?
        `
    ).get(slug)

    return product;
}
export function createUser(email:string,password:string){
    const result=db.prepare(
        `
            INSERT INTO users(email,password) VALUES(?,?)
        `
    ).run(email,password);
    return result.lastInsertRowid;
}

export function getUserByEmail(email){
    const user=db.prepare(
        `
            SELECT * FROM  users WHERE email=?
        `
    ).get(email)
    return user;
}
export async function getUserById(id){       
        const user=db.prepare(
            `
                SELECT * FROM users WHERE id=?
            `
        ).get(id)
        return user.email
}

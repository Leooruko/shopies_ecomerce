"use server"
import sql from 'better-sqlite3';
import { getUser } from './actions';
const db=sql('store.db')
export async function getAllProducts(user_id: number){
    const data=db.prepare(
        `
        SELECT 
            p.*, 
            COALESCE(c.quantity, 0) AS inCart
            FROM products p 
            LEFT JOIN cart c 
            ON c.product_id = p.id 
            AND c.user_id = ?;

        `
    ).all(user_id)    
    return data;
}

export async function getProduct(slug:string,user_id:number){  
    const product=db.prepare(
        `
           SELECT p.*,c.id AS cart_id, COALESCE(c.quantity, 0) AS inCart
            FROM products p
            LEFT JOIN cart c 
                ON c.product_id = p.id 
                AND c.user_id = ? 
            WHERE p.slug = ?;
        `
    ).get(user_id,slug)

    return product;
}
export async function createUser(email:string,password:string){
    const result=db.prepare(
        `
            INSERT INTO users(email,password) VALUES(?,?);
        `
    ).run(email,password);
    return result.lastInsertRowid;
}

export async function getUserByEmail(email:string){
    const user=db.prepare(
        `
            SELECT * FROM  users WHERE email=?;
        `
    ).get(email)
    return user;
}
export  async function getUserById(id:string){       
        const user=db.prepare(
            `
                SELECT * FROM users WHERE id=?;
            `
        ).get(id)
        return user.email
}



export async function fetchCart(id:number){
    const products=db.prepare(
        `
            SELECT c.id AS cart_id,c.quantity, p.name,p.image,p.price,p.id AS product_id FROM cart c
            JOIN products p ON c.product_id=p.id
            WHERE c.user_id=?;
        `
    ).all(id)  
    return products
}

export async  function addToCart(user_id:number,product_id:number){
    db.prepare(
        `
        INSERT INTO cart (user_id,product_id)
        VALUES(?,?);
        `
    ).run(user_id,product_id)
}

export async function removeFromCart(id:number){
    db.prepare(
        `
           DELETE FROM cart WHERE id=?;
        `
    ).run(id)
}

export async function addItemQuantity(user_id?:number,product_id?:number,id?:number){
    db.prepare(
        `
            UPDATE cart
            SET quantity = quantity + 1
            WHERE ((user_id=? AND product_id=?) OR id=?) AND quantity IS NOT NULL;
        `
    ).run(user_id,product_id,id)
}

export async function deductItemQuantity(id: number){
    db.prepare(
        `
           UPDATE cart
           SET quantity = quantity - 1
            WHERE id=? ;
        `
    ).run(id)
}


"use server"
import { createAuthSession, destroySession, verifyAuthSession } from "@/lib/auth";
import { hashPassword,verifyPassword } from "./hash"
import { createUser, getUserByEmail } from "@/lib/store_actions";
import { redirect } from "next/navigation";

interface Errors {
    email?: string;
    password?: string;
}

export async function signUp(prevState: any, formData: FormData){
    const email = formData.get('email') as string;
    const password = (formData.get('password') as string).trim();
    const errors: Errors = {};
    if (!email.includes('@')) {
        errors.email = 'Invalid email address';
    }
    if (password.length < 8) {
        errors.password = 'Password should be at least 8 characters long';
    }
    if (Object.keys(errors).length > 0) {
        return { errors };
    }
    try{
        const hashedPassword =hashPassword(password);
        const id = await createUser(email, hashedPassword);
        await createAuthSession(id);
    }catch(e:unknown){
        if (e instanceof Error && e.message==='UNIQUE constraint failed: users.email'){
            return {errors:{email:'This email has already been registered.Try using another one'}}
        }
        return {errors:(e as Error ).message}
    }
    redirect('/')
    
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = (formData.get('password') as string).trim();
    const existingUser=getUserByEmail(email)
    if(!existingUser){
        return{errors:{email:'Could not authenticate user with invalid credentials.Email'}}
    }
    const isPasswordValid=verifyPassword(existingUser.password,password)    
    if(!isPasswordValid){
        return {errors:{password:'Could not authenticate user with invalid credentials.Password'}}
    }
    
    await createAuthSession(existingUser.id)
    redirect('/')    
}

export async function auth(mode: string, prevState: any, formData: FormData) {
    switch (mode) {
        case 'login':
            return await login(prevState, formData);
        case 'signup':
            return await signUp(prevState, formData);
        default:
            throw new Error('Invalid mode');
    }
}

export async function logout(){
    await destroySession()
    redirect('/auth')
}
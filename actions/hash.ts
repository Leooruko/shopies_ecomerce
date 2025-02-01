import crypto from 'node:crypto';
export function hashPassword(password){
    const salt=crypto.randomBytes(16).toString('hex')
    const hash=crypto.scryptSync(password,salt,64)
    return hash.toString('hex')+':'+salt;
}

export async function verifyPassword(storedPassword,suppliedPassword){
    const [storedHash,salt]=storedPassword.split(':')
    const storedPasswordBuf=Buffer.from(storedHash,'hex')
    const suppliedPasswordBuf=await crypto.scryptSync(suppliedPassword,salt,64)
    return crypto.timingSafeEqual(storedPasswordBuf,suppliedPasswordBuf)
}
import bcrypt from "bcryptjs";

async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

async function compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export const cryptUtil = { hash, compare };

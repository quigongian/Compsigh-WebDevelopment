import bcrypt from "bcryptjs";
import crypto from "crypto";
import { envVars } from "./env-vars";

const algorithm = "AES-256-CBC";

async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

async function compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

async function encrypt(text: string): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, envVars.CRYPT_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

async function decrypt(encryptedText: string): Promise<string> {
    const textParts = encryptedText.split(":");
    const iv = textParts[0];
    const content = textParts[1];
    const decipher = crypto.createDecipheriv(
        algorithm,
        envVars.CRYPT_KEY,
        Buffer.from(iv, "hex")
    );
    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(content, "hex")),
        decipher.final(),
    ]);

    return decrpyted.toString();
}

export const cryptUtil = { hash, compare, encrypt, decrypt };

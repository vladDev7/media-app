import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) as number,
    url: process.env.DB_URL as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
}))
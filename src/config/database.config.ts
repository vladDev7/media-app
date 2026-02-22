import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.host as string,
    port: Number(process.env.port) as number,
}))
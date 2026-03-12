import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    jwt_access_token_expiration_ms: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_MS) as number,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    jwt_refresh_token_expiration_ms: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_MS) as number,
}))
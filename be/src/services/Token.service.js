import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

const { REFRESH_KEY, ACCESS_KEY } = process.env;

class Token {
    async genAccessToken(account) {
        return jwt.sign({
            id: account._id,
            level: account.levelAccount,
            admin: account.admin,
        }, ACCESS_KEY, { expiresIn: "10h" });
    }
    async genRefreshToken(account) {
        return jwt.sign({
            id: account._id,
            level: account.levelAccount,
            admin: account.admin,
        }, REFRESH_KEY, { expiresIn: "365d" });
    }
}

export default new Token()
import jwt from 'jsonwebtoken'
import config from '../config.js';

const createAccessToken = (id: string, roles: Array<string>) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, config.secret, {expiresIn: '24h'});
};

export default createAccessToken;
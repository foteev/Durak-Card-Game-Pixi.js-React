import User from '../schemas/user.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../tools/token.js';
import { ICandidate } from '../components/types/interfaces.js';

class AuthService {
    async register(candidate: ICandidate) {
        const { email, password } = candidate;
        const isEmailExist = await User.findOne({ email });

        if(isEmailExist) {
            return 'User with this email already exist';
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            'email': email,
            'password': hashedPassword,
            'roles': ['Kupujący', 'Sprzedający', 'ADMIN', 'SYSTEM', 'Kurier']
        });

        return newUser;
    };

    async login(email: string, password: string) {
        const user = await User.findOne({ email });

        if(!user) {
            return `User with this email (${email}) doesn't exist`;
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password as string);

        if(!isCorrectPassword) {
            return 'Incorrect password';
        }

        const token = createAccessToken(user.id, user.roles);

        return { token };
    };

    async logout() {
        return { token: null };
    };
}

export default new AuthService();

import User from '../schemas/user.js';

class UserService {
    async create(user: any) {
        const newUser = await User.create(user);
        return newUser;
    };

    async get(id: string) {
        const user = await User.findById(id);
        return user;
    };

    async update(id: string, user: any) {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    };

    async delete(id: string) {
        const user = await User.findByIdAndDelete(id);
        return user;
    };

    async getAll() {
        const users = await User.find();
        return users;
    };

    async getByEmail(email: string) {
        const user = await User.findOne({'email': `${email}`});
        return user;
    }
}

export default new UserService();
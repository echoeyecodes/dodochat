import { getUserByEmail } from './getUserByEmail';
import { createUser } from './createUser';
import { getUserById } from './getUserById';
import { updateUser } from './updateUser';

export const userRepository = {
    getUserByEmail,
    createUser,
    getUserById,
    updateUser,
};

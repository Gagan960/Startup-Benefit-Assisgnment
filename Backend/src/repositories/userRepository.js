import User from "../Schema/User.js";

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log("Error finding user by email:", error);
        throw error;
    }
};

export const findAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.log("Error finding all users:", error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        console.log("Error creating user:", error);
        throw error;
    }
};

  
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";

export const signupUserService = async (user) => {
    try{
        const newUser = await createUser(user);
        return newUser;
    }
    catch(error){
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw{
                status: 400,
                message: "User with this email or username already exists"
            }
        }
        throw error;
    
    }
}

export const signinUserService = async (userDetail) => {
    try{
        //1 check if there is a valid registered user with this email
        const user= await findUserByEmail(userDetail.email);
        if(!user){
            throw{
                status: 401,
                message: "User not found"
            }
        }

        //2 compare the password 
        const ispasswordValid = await bcrypt.compareSync(userDetail.password, user.password);
        if(!ispasswordValid){
            throw{
                status: 401,
                message: "Invalid password"
            }
        }

        //generate token
        const token =generateJwtToken({id: user._id, username: user.username, email: user.email});
        return token;
    } catch(error){
        throw error;
    }
}

export const checkIfUserExistsService = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}
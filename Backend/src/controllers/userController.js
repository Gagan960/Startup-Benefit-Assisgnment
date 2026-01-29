import { success } from "zod";
import { signupUserService,signinUserService, checkIfUserExistsService } from "../services/userService.js";

export async function createUser(req, res) {
    return res.status(501).json({ message: "Not implemented" });
}

export async function signup(req,res) {
    try {
        const user = await signupUserService(req.body);
        const safeUser = user?.toObject ? user.toObject() : user;
        if (safeUser?.password) delete safeUser.password;
        return res.status(201).json({
            success:true,
            message: "User signed up successfully",
            data:safeUser

        });
    } catch (error) {
        console.log("Signup error:", error);
        if(error.status){
            return res.status(error.status).json({
                success:false,
                message: error.message
            })
        }
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export async function signin(req,res) {
    try{
        const response =await signinUserService(req.body);
        return res.status(200).json({
            success:true,
            message: "User signed in successfully",
            data: response
        });
    }catch(error){
         console.log("Signin error:", error);
        if(error.status){
            return res.status(error.status).json({
                success:false,
                message: error.message
            })
        }
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error.message
        });

    }

}

export async function me(req, res) {
    try {
        const user = await checkIfUserExistsService(req.user.email);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const safeUser = user?.toObject ? user.toObject() : user;
        if (safeUser?.password) delete safeUser.password;

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: safeUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
    
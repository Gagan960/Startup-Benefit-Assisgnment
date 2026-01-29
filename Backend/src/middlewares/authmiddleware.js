import { checkIfUserExistsService } from "../services/userService.js";
import { verifyJwt } from "../utils/jwt.js";

function extractToken(req) {
    const xAccessToken = req.headers["x-access-token"];
    if (xAccessToken) return xAccessToken;

    const authHeader = req.headers["authorization"];
    if (!authHeader) return null;

    const [scheme, value] = authHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !value) return null;

    return value;
}

export const isAuthenticated = async (req, res, next) => {
    //check if jwt is passed in headers
    const token = extractToken(req);
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Access token is missing"
        });
    }
    //verify the token
    try{
        const response = verifyJwt(token);
        if(!response?.email){
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            });
        }
        const doesUserExists = await checkIfUserExistsService(response.email);
        if(!doesUserExists){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = response;
        req.user.isVerified = doesUserExists.isVerified;
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid access token",
            error: error.message
        });
    }
};
import {z} from 'zod';

export const zodSigninSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(5, { message: "Password must be at least 6 characters long" })
});

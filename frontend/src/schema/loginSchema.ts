import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Not a valid Email Address."}),
    password: z.string().min(4, { message: "Password must be at least 5 characters."}),
    persist: z.boolean(),
})

export type LoginSchema = z.infer<typeof loginSchema>;
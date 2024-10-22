import { z } from "zod";

export const addAdminSchema = z.object({
    adminName: z.string().min(3, { message: "Full Name must be at least 3 characters."}),
    email: z.string().email({ message: "Not a valid Email Address."}),
    phoneNumber: z.string().min(4, { message: "Phone Number must be at least 4 characters."}),
    location: z.string().min(4, { message: "Location must be at least 4 characters."}),
    password: z.string().min(4, { message: "Password must be at least 4 characters."}),
    role: z.string().min(4, { message: "role must be at least 4 characters."}),
    // confirmPassword: z.string().min(4, { message: "Password must be at least 4 characters."}),
})
// .superRefine(({password, confirmPassword}, ctx) => {
//     if(password !== confirmPassword) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "password and confirm password must match",
//             path: ["confirmPassword"]
//         })
//     }
// })

export type AddAdminSchema = z.infer<typeof addAdminSchema>;

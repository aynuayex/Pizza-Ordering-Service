import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3, { message: "Full Name must be at least 3 characters."}),
    email: z.string().email({ message: "Not a valid Email Address."}),
    password: z.string().min(4, { message: "Password must be at least 4 characters."}),
    confirmPassword: z.string().min(4, { message: "Password must be at least 4 characters."}),
    location: z.string().min(4, { message: "Location must be at least 4 characters."}),
    phoneNumber: z.string().min(4, { message: "Phone Number must be at least 4 characters."}),
    termsAndConditions: z.boolean().default(false),
}).superRefine(({password, confirmPassword, termsAndConditions}, ctx) => {
    if(password !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "password and confirm password must match",
            path: ["confirmPassword"]
        })
    }

    if(!termsAndConditions) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You must accept terms and conditions",
            path: ["termsAndConditions"]
        })  
    }
})

export type SignUpSchema = z.infer<typeof signUpSchema>;

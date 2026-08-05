import { z } from "zod";


export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
});


export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

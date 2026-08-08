import { z } from "zod";

export const CheckoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain digits and + - ( )",
    ),
  address: z
    .string()
    .trim()
    .min(10, "Please enter a complete shipping address")
    .max(300),
});

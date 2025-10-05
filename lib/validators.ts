import { z } from "zod";

export const otpSchema = z.object({
  countryCode: z.string().min(1, "Select country"),
  phone: z.string().min(7, "Enter phone number")
    .regex(/^[0-9+]{7,15}$/, "Invalid phone"),
  otp: z.string().optional()
});

export const chatroomSchema = z.object({
  title: z.string().min(1, "Title required")
});


import { z } from "zod";

// Define schema for password validation
export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "A senha atual é obrigatória"),
  newPassword: z.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .refine(password => /[A-Z]/.test(password), {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .refine(password => /[0-9]/.test(password), {
      message: "A senha deve conter pelo menos um número",
    }),
  confirmPassword: z.string().min(1, "Confirme sua nova senha")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;

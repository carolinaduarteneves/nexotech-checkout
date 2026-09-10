import { z } from 'zod'

export const cartaoSchema = z.object({
  titular: z.string().trim().min(1, 'Informe o nome impresso no cartão.'),
  numero: z
    .string()
    .transform((valor) => valor.replace(/[\s-]/g, ''))
    .refine((valor) => /^\d{16}$/.test(valor), 'O número do cartão deve ter 16 dígitos.'),
  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA, com mês entre 01 e 12.'),
  cvv: z.string().regex(/^\d{3}$/, 'O CVV deve ter 3 dígitos.'),
})

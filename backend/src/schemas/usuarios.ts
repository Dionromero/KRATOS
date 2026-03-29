import { z } from 'zod';

export const criarUsuarioSchema = z.object({
    nome: z.string().min(5, "nome deve ter 5 caracteres").max(100, "nome deve ter no maximo 100 caracteres"),
    email: z.string().email("email invalido"),
    idade: z.number().int("idade deve ser um número inteiro").min(18, "usuario deve ter até 18 anos para fazer cadastro").max(150).optional()
})

export const atualizarUsuariosSchema = z.object({
    nome: z.string().min(5).max(100).optional(),
    email: z.string().email().optional(),
    idade: z.number().int().min(18).max(150).optional(),
})

export type CriarUsuario = z.infer<typeof criarUsuarioSchema>
export type AtualizarUsuarios = z.infer<typeof atualizarUsuariosSchema>

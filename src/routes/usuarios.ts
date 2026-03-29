import { Elysia } from "elysia"
import { getDb } from "../database"
import { criarUsuarioSchema, atualizarUsuariosSchema } from "../schemas/usuarios"
import { ObjectId } from "mongodb"

export const usuariosRoutes = new Elysia({ prefix: "/api/usuarios" })

.post("/", async ({ body, set }) => {
    const validacao = criarUsuarioSchema.safeParse(body)
    if (!validacao.success) {
        set.status = 400
        return { error: "dados invalidos", detalhes: validacao.error }
    }

    const { nome, email, idade } = validacao.data
    try {
        const result = await getDb().collection("usuarios").insertOne({
            nome,
            email,
            idade: idade ?? null,
            criado_em: new Date(),
            atualizado_em: new Date()
        })
        set.status = 201
        return { id: result.insertedId, nome, email, idade }
    } catch (erro: any) {
        if (erro.code === 11000) {
            set.status = 409
            return { erro: "Email ja cadastrado" }
        }
        throw erro
    }
})

.get("/", async () => {
    const usuarios = await getDb()
        .collection("usuarios")
        .find()
        .sort({ criado_em: -1 })
        .toArray()
    return usuarios
})

.get("/:id", async ({ params, set }) => {
    if (!ObjectId.isValid(params.id)) {
        set.status = 400
        return { error: "id invalido" }
    }
    const usuario = await getDb()
        .collection("usuarios")
        .findOne({ _id: new ObjectId(params.id) })
    if (!usuario) {
        set.status = 404
        return { error: "usuario nao encontrado" }
    }
    return usuario
})

.put("/:id", async ({ params, body, set }) => {
    if (!ObjectId.isValid(params.id)) {
        set.status = 400
        return { error: "id invalido" }
    }
    const validacao = atualizarUsuariosSchema.safeParse(body)
    if (!validacao.success) {
        set.status = 400
        return { error: "dados invalidos", detalhes: validacao.error }
    }

    const result = await getDb().collection("usuarios").findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: { ...validacao.data, atualizado_em: new Date() } },
        { returnDocument: "after" }
    )
    if (!result) {
        set.status = 404
        return { error: "usuario nao encontrado" }
    }
    return result
})

.delete("/:id", async ({ params, set }) => {
    if (!ObjectId.isValid(params.id)) {
        set.status = 400
        return { error: "id invalido" }
    }
    const result = await getDb().collection("usuarios").findOneAndDelete(
        { _id: new ObjectId(params.id) }
    )
    if (!result) {
        set.status = 404
        return { error: "usuario nao encontrado" }
    }
    return { success: true, data: result }
})
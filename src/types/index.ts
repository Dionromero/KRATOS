import { ObjectId } from "mongodb"
export interface Usuario {
    id: ObjectId;
    nome: string;
    email: string;
    idade?: number;
    criado_em: Date;
    atualizado_em?: Date;
}

export interface CriarUsuario {
    nome: string;
    email: string;
    idade?: number;
}

export interface AtualizarUsuario {
    nome?: string;
    email?: string;
    idade?: number;
}

export interface DeletarUsuario {
    id: ObjectId;
}

export interface ResponseUsuario {
    usuario: Usuario;
}

export interface ResponseUsuarios {
    usuarios: Usuario[];
}

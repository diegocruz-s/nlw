import { FastifyRequest } from "fastify";

export async function authenticate(req: FastifyRequest){
    await req.jwtVerify();  // Verifica se existe um jwt no headers e se ele for inválido um erro é gerado

}
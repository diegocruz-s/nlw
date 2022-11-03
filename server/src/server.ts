import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import cors from '@fastify/cors';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query'],   // Prisma loga as querys executadas
})
    // CTRL + Shift + P => restart ts server => reiniciar o server e usar o DB atualizado
async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();
        return { count };
    });

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();
        return { count };
    });

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();
        return { count };
    });

    fastify.post('/pools', async (req, res) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(req.body);

        const generate = new ShortUniqueId({ length: 6 });
        const code = String(generate()).toUpperCase();

        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        return res.status(201).send({ code });
    });

    await fastify.listen({ port: 3333, host: '0.0.0.0' });

};

bootstrap();

// "devDependencies": {
//     "@mermaid-js/mermaid-cli": "^9.1.7",
//     "prisma": "^4.5.0",
//     "prisma-erd-generator": "^1.2.2",
//     "tsx": "^3.11.0",
//     "typescript": "^4.8.4"
//   },
//   "dependencies": {
//     "@fastify/cors": "^8.1.1",
//     "@prisma/client": "^4.5.0",
//     "fastify": "^4.9.2"
//   }
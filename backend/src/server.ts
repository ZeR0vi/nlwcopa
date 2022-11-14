import Fastify from "fastify";
import { z } from 'zod';
import cors from '@fastify/cors'
import {  PrismaClient  } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'


const prisma = new PrismaClient({
    log: ['query'],
})

async function start() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/boloes/contagem',async ()  =>{
        const contagem = await prisma.boloes.count()


        return {  contagem }
    })

    fastify.get('/user/contagem',async ()  =>{
        const contagem = await prisma.user.count()


        return {  contagem }
    })

    fastify.get('/guesses/contagem',async ()  =>{
        const contagem = await prisma.guess.count()


        return {  contagem }
    })


    fastify.post('/boloes',async ( request, reply )  =>{//use post for create new information

        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase() 

        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } =  createPoolBody.parse(request.body)

        await prisma.boloes.create({
            data: {
                title,
                code,
            }
        })

        return reply.status(201).send({ code })


    })

    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

start()

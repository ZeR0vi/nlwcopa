import Fastify from "fastify";
import { z } from 'zod';
import cors from '@fastify/cors'
import {  PrismaClient  } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
import { prisma } from './lib/prisma'
import jwt from '@fastify/jwt'
import { authenticate } from "./plugins/authenticate";


async function start() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(jwt, {
        secret: 'nlwcopa',
    })

    fastify.get('/guesses/contagem',async ()  =>{
        const contagem = await prisma.guess.count()


        return {  contagem }
    })


    fastify.get('/user/contagem',async ()  =>{
        const contagem = await prisma.user.count()


        return {  contagem }
    })
    

    fastify.get('/boloes/contagem',async ()  =>{
        const contagem = await prisma.boloes.count()
    
    
        return {  contagem }
    })

    fastify.get('/me',  {
        onRequest: [authenticate]
    }, async (request) =>{

        return { user: request.user }
    })

    fastify.post('/users',async (request) => {
        const createUserBody = z.object({
            access_token: z.string()
        })

        const { access_token } = createUserBody.parse(request.body)
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const userData = await userResponse.json() 

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            avatar: z.string().url(),
            googleId: z.string(),
        })

        const userInfo = userInfoSchema.parse(userData)

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id  
            }

        })

        if(!user){
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.avatar
                }
            })
        }

        const token = fastify.jwt.sign({
            name: userInfo.name,
            avatarUrl: user.avatarUrl
        },{
            sub: user.id,
            expiresIn: '2 days',
        })
        return { token }
    } )

    fastify.post('/boloes',async ( request, reply )  =>{//use post for create new information

        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase() 
    
        const createPoolBody = z.object({
            title: z.string(),
        })
    
        const { title } =  createPoolBody.parse(request.body)



        try {
            await request.jwtVerify()

                
            await prisma.boloes.create({
                data: {
                   title,
                   code,
                   onwerId: request.user.sub,

                   participant: {
                       create: {
                           userId: request.user.sub
                       }
                   }
              }
        })
        }catch{
                
        await prisma.boloes.create({
            data: {
                title,
                code,
            }
        })
        }

    
        return reply.status(201).send({ code })
    
    
    })

    fastify.get('boloes', { onRequest: [authenticate]}, async(request) => {
        const pools = await prisma.boloes.findMany({
            where:{
                participant: {
                    some:{
                        userId: request.user.sub

                    }
                }
            },
            include: {
                _count:{
                    select: {
                        participant:true
                    }
                },
                participant: {
                    select: {
                        id: true,

                        user:{
                            select:{
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4,

                }

//                owner: {
//                    select:{
//                        id: true,
//                        name: true
//                    }
//                }
            }
        })

        return { pools }
    })

    
    fastify.post('/boloes/join', { onRequest: [authenticate]}, async (request, reply) =>{
        const joinPoolBody = z.object({
            code: z.string()
        })

        const { code } = joinPoolBody.parse(request.body)

        const pool = await prisma.boloes.findUnique({
            where:{
                code,
            },
            include: {
                participant: {
                    where:{
                        userId: request.user.sub
                    }
                }
            }
        })

        if(!pool){
            return reply.status(400).send({
                message: 'Pool not found'
            })
        }

        if(pool.participant.length > 0 ) {
            return reply.status(400).send({
                message: 'Pool already joined'
            })
        }

        if(!pool.onwerId) {
            await prisma.boloes.update({
                where:{
                    id: pool.id
                },
                data:{
                    onwerId: request.user.sub

                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: request.user.sub

            }
        })

        return reply.status(201).send()
    })

    fastify.get('/boloes/:id', {onRequest: [authenticate]}, async (request) => {
        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(request.params)

        const pools = await prisma.boloes.findUnique({
            where:{
                id,
            },
            include: {
                _count:{
                    select: {
                        participant:true
                    }
                },
                participant: {
                    select: {
                        id: true,

                        user:{
                            select:{
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4,

                }

//                owner: {
//                    select:{
//                        id: true,
//                        name: true
//                    }
//                }
            }
        })
        return { pools }
        
    })



    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

start()
function userRoutes(userRoutes: any) {
    throw new Error("Function not implemented.");
}


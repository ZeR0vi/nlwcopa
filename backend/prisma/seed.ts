import {  PrismaClient  } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
      data: {
            name: 'zero',
            email: 'zero@gmail.com',
            avatar: 'https://github.com/ZeR0vi.png',
        }
    })

    const bolao = await prisma.boloes.create({
        data:{
            title: 'example',
            code: 'bolao1',
            onwerId: user.id,

            participant:{
                create:{
                    userId: user.id
                }
            }
        }
        
    });

    await prisma.game.create({
        data:{
            data: '2022-11-02T12:00:00.205Z',
            firstTeam: 'DE',
            secondTeam: 'BR', 
        }
    })

    await prisma.game.create({
        data:{
            data: '2022-11-03T12:00:00.205Z',
            firstTeam: 'BR',
            secondTeam: 'AR',
            
            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant:{
                        connect: {
                            poolId_userId: {
                                userId: user.id,
                                poolId: bolao.id
                            }
                        }
                    }
                }
            }
        }
    })

}
main()
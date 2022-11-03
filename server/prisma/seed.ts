import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alex',
            email: 'alex@gmail.com',
            avatarUrl: 'http://github.com/diegocruz-s.png'
        }
    })
    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool 2',
            code: 'BOL321',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    // const participant = await prisma.participant.create({
    //     data: {
    //         poolId: pool.id,
    //         userId: user.id
    //     }
    // })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.994Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.994Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect()
        process.exit(1)
    });

import prisma from './db.js'
import { hashPassword } from './utils/auth.js'
const userData = [
    {
        email:'user@test.com',
        password:await hashPassword('123456'),
        role:'USER'

    },
    {
        email:'admin@test.com',
        password:await hashPassword('123456'),
        role:'ADMIN'

    },
]

await prisma.user.deleteMany({where:{}})

await Promise.all(
    userData.map(user => {
        return prisma.user.create({
            data:{
                email:user.email,
                password: user.password,
                role:user.role
            }
        })
    })
)


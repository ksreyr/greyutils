const {PrismaClient} = require("@prisma/client");
const {faker} = require("@faker-js/faker");
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
//Model
type RegisterModel = {
    id: string,
    totalSinIva: number,
    number: number,
    iva: number,
    date: string
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(year: number) {
    const month = getRandomInt(0, 11); // Meses en JavaScript van de 0 (enero) a 11 (diciembre)
    const day = getRandomInt(1, 31); // Días van de 1 a 31
    return new Date(year, month, day);
}

const year = 2023;

//
const registerMother = (): RegisterModel => {
    return {
        id: faker.datatype.uuid(),
        number: faker.datatype.number({max: 100, min: 1}),
        iva: faker.datatype.number({max: 10000, min: 1000}),
        totalSinIva: faker.datatype.number({max: 100000, min: 50000}),
        date: randomDate(year).toISOString()
    }

}

async function hashPassword(plaintextPassword:string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintextPassword, salt,);
}

async function main() {
    for (let i = 0; i < 30; i++) {
        const register = registerMother()
        const registerToSave = await prisma.register.upsert({
            where: {
                id: ''
            },
            update: {},
            create: register,
        })
        console.log("DB Seeded Register", {...registerToSave});
    }
    const password = await hashPassword('admin');
    const userAdmin = await prisma.user.create({
        data: {
            name: 'greyutils',
            email: 'greyutils@gmail.com',
            password: password
        }
    })
    console.log("DB Seeded Register", {...userAdmin});

}

main()
    .then(async () => {
        // @ts-ignore
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        // @ts-ignore
        await prisma.$disconnect()
        process.exit(1)
    })
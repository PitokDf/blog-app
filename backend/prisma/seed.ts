import { prisma } from "../src/db/prisma";
import { hashing } from "../src/utils/bcrypt";

async function main() {

    await prisma.users.create({
        data: {
            email: "admin@gmail.com",
            first_name: "Admin",
            last_name: "",
            password_hash: (await hashing("Password!23"))!,
            role: "admin"
        }
    })

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
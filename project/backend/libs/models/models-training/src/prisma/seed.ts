import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
    try {
        await prisma.training.create({
            data: {
                title: 'Crossfit',
                backgroundImage: 'training-4.png',
                level: 'Professional',
                trainingStyle: 'Crossfit',
                trainingTime: 'Time100',
                caloriesLoss: 1000,
                gender: 'Female',
                description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
                video: 'crossfit.mp4',
                price: 0,
                rating: 5,
                coachId: 123,
                isSpecial: false,
            },
        });
        await prisma.training.create({
            data: {
                title: 'Crossfit',
                backgroundImage: 'training-4.png',
                level: 'Professional',
                trainingStyle: 'Crossfit',
                trainingTime: 'Time100',
                caloriesLoss: 1000,
                gender: 'Female',
                description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
                video: 'crossfit.mp4',
                price: 0,
                rating: 5,
                coachId: 123,
                isSpecial: false,
            },
        });
        await prisma.training.create({
            data: {
                title: 'Crossfit',
                backgroundImage: 'training-4.png',
                level: 'Professional',
                trainingStyle: 'Crossfit',
                trainingTime: "Time100",
                caloriesLoss: 1000,
                gender: 'Female',
                description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
                video: 'crossfit.mp4',
                price: 0,
                rating: 5,
                coachId: 123,
                isSpecial: false,
            },
        });
        await prisma.training.create({
            data: {
                title: 'Crossfit',
                backgroundImage: 'training-4.png',
                level: 'Professional',
                trainingStyle: 'Crossfit',
                trainingTime: 'Time100',
                caloriesLoss: 1000,
                gender: 'Female',
                description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
                video: 'crossfit.mp4',
                price: 0,
                rating: 5,
                coachId: 123,
                isSpecial: false,
            },
        });
        await prisma.training.create({
            data: {
                title: 'Crossfit',
                backgroundImage: 'training-4.png',
                level: 'Professional',
                trainingStyle: 'Crossfit',
                trainingTime: 'Time100',
                caloriesLoss: 1000,
                gender: 'Female',
                description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
                video: 'crossfit.mp4',
                price: 0,
                rating: 5,
                coachId: 123,
                isSpecial: false,
            },
        });
        console.info('🤘️ Database was filled')

    } catch (err) {
        console.error(err);

        await prisma.$disconnect();

        process.exit(1);
    }
}

fillDb();
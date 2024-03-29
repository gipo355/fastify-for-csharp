import { FastifyPluginAsync } from "fastify";

import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../prisma.js";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post<{ Body: { email: string; password: string } }>(
        "/",
        async function (request) {
            const { email, password } = request.body;

            const user = await prisma.user.findUnique({
                where: {
                    email,
                    password,
                },
            });

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: uuidv4(),
                    updatedAt: new Date(),
                },
            });

            return updatedUser;
        },
    );
};

export default root;

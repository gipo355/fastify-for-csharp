import { FastifyPluginAsync } from "fastify";

import { prisma } from "../../prisma.js";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: { email: string; password: string } }>(
    "/",
    async function (request) {
      const { email, password } = request.body;

      const newUser = prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return newUser;
    },
  );
};

export default root;

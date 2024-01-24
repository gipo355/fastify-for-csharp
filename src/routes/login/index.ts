import { FastifyPluginAsync } from "fastify";

import { v4 as uuidv4 } from "uuid";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Body: { username: string; password: string } }>(
    "/",
    async function (request, reply) {
      const { username, password } = request.body;

      const token = uuidv4();

      return { root: true };
    },
  );
};

export default root;

import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Body: { username: string; password: string } }>(
    "/",
    async function (request, reply) {
      const { username, password } = request.body;

      return { root: true };
    },
  );
};

export default root;

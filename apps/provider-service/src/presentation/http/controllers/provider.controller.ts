import { FastifyReply, FastifyRequest } from "fastify";
import { createProviderSchema } from "../validators/create-provider.validator";
import { CreateProviderUseCase } from "../../../application/use-cases/create-provider.use-case";
import { makeCreateProviderUseCase } from "../../../application/factories/provider/make-create-provider-use-case";

export class ProviderController {
  public static async register(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const dto = createProviderSchema.parse(request.body);

    const authUserId =
    request.user.sub


    const registerProvider = makeCreateProviderUseCase();

    const provider = await registerProvider.execute({
    authUserId,
    dto
  });

    return reply.status(201).send(provider);
  }
}

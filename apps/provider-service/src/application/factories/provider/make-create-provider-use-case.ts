import { MongoProviderRepository } from "../../../infrastrucure/repositories/mongo-provider.repository";
import { CreateProviderUseCase } from "../../use-cases/create-provider.use-case";



export const makeCreateProviderUseCase = (): CreateProviderUseCase => {
    const providerRepository = new MongoProviderRepository();
    return new CreateProviderUseCase(providerRepository);
}
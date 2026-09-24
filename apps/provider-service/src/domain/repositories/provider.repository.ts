import { ProviderEntity } from "../entity/provider.entity";

export interface IProviderRepository {
  create(provider: ProviderEntity): Promise<ProviderEntity>;

  findById(id: string): Promise<ProviderEntity | null>;

  findByAuthUserId(authUserId: string): Promise<ProviderEntity | null>;

  findByBookingSlug(bookingSlug: string): Promise<ProviderEntity | null>;

  update(provider: ProviderEntity): Promise<ProviderEntity>;

  softDelete(id: string): Promise<void>;
}

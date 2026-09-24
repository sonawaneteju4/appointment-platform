import { IProviderRepository } from "../../domain/repositories/provider.repository";

import { ProviderStatus } from "../../domain/enums/provider-status.enum";

import { ConflictError } from "@appointment-platform/shared-errors";

import { ProviderEntity } from "../../domain/entity/provider.entity";

import { CreateProviderDto } from "../../presentation/http/validators/create-provider.validator";

interface CreateProviderUseCaseRequest {
  authUserId: string;

  dto: CreateProviderDto;
}

export class CreateProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}
  async execute({
    authUserId,

    dto,
  }: CreateProviderUseCaseRequest): Promise<ProviderEntity> {
    // -------------------------
    // Check Existing Provider
    // -------------------------

    const existingProvider =
      await this.providerRepository.findByAuthUserId(authUserId);

    if (existingProvider) {
      throw new ConflictError("Provider already exists for this user");
    }

    // -------------------------
    // Check Slug Uniqueness
    // -------------------------

    const existingSlug = await this.providerRepository.findByBookingSlug(
      dto.bookingSlug,
    );

    if (existingSlug) {
      throw new ConflictError("Booking slug already exists");
    }

    // -------------------------
    // Create Entity
    // -------------------------

    const provider = new ProviderEntity({
      authUserId,

      displayName: dto.displayName,

      bookingSlug: dto.bookingSlug,

      description: dto.description,

      logoUrl: dto.logoUrl,

      bannerUrl: dto.bannerUrl,

      website: dto.website,

      socialLinks: dto.socialLinks,

      businessName: dto.businessName,

      providerType: dto.providerType,

      providerBusiness: dto.providerBusiness,

      contactInfo: dto.contactInfo,

      location: dto.location,

      timezone: dto.timezone,

      status: ProviderStatus.DRAFT,

      isPublic: false,

      onboardingCompleted: false,
    });

    // -------------------------
    // Persist
    // -------------------------

    return await this.providerRepository.create(provider);
  }
}

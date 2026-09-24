import { ProviderModel } from "../database/schemas/provider.schema";

import { ProviderEntity } from "../../domain/entity/provider.entity";

import { IProviderRepository } from "../../domain/repositories/provider.repository";

export class MongoProviderRepository implements IProviderRepository {
  async create(provider: ProviderEntity): Promise<ProviderEntity> {
    const createdProvider = await ProviderModel.create({
      authUserId: provider.authUserId,

      displayName: provider.displayName,

      bookingSlug: provider.bookingSlug,

      description: provider.description,

      logoUrl: provider.logoUrl,

      bannerUrl: provider.bannerUrl,

      website: provider.website,

      socialLinks: provider.socialLinks,

      businessName: provider.businessName,

      providerType: provider.providerType,

      providerBusiness: provider.providerBusiness,

      contactInfo: provider.contactInfo,

      location: provider.location,

      timezone: provider.timezone,

      status: provider.status,

      isPublic: provider.isPublic,

      onboardingCompleted: provider.onboardingCompleted,

      moderationNotes: provider.moderationNotes,

      subscriptionPlan: provider.subscriptionPlan,

      subscriptionExpiresAt: provider.subscriptionExpiresAt,

      deletedAt: provider.deletedAt,
    });

    return this.toEntity(createdProvider);
  }

  async findById(id: string): Promise<ProviderEntity | null> {
    const provider = await ProviderModel.findById(id);

    if (!provider) {
      return null;
    }

    return this.toEntity(provider);
  }

  async findByAuthUserId(authUserId: string): Promise<ProviderEntity | null> {
    const provider = await ProviderModel.findOne({
      authUserId,

      deletedAt: null,
    });

    if (!provider) {
      return null;
    }

    return this.toEntity(provider);
  }

  async findByBookingSlug(bookingSlug: string): Promise<ProviderEntity | null> {
    const provider = await ProviderModel.findOne({
      bookingSlug,

      deletedAt: null,
    });

    if (!provider) {
      return null;
    }

    return this.toEntity(provider);
  }

  async update(provider: ProviderEntity): Promise<ProviderEntity> {
    const updatedProvider = await ProviderModel.findByIdAndUpdate(
      provider.id,
      {
        displayName: provider.displayName,

        description: provider.description,

        logoUrl: provider.logoUrl,

        bannerUrl: provider.bannerUrl,

        website: provider.website,

        socialLinks: provider.socialLinks,

        businessName: provider.businessName,

        contactInfo: provider.contactInfo,

        location: provider.location,

        timezone: provider.timezone,

        status: provider.status,

        isPublic: provider.isPublic,

        onboardingCompleted: provider.onboardingCompleted,

        moderationNotes: provider.moderationNotes,

        subscriptionPlan: provider.subscriptionPlan,

        subscriptionExpiresAt: provider.subscriptionExpiresAt,

        deletedAt: provider.deletedAt,
      },
      {
        new: true,
      },
    );

    if (!updatedProvider) {
      throw new Error("Provider not found");
    }

    return this.toEntity(updatedProvider);
  }

  async softDelete(id: string): Promise<void> {
    await ProviderModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  }

  private toEntity(provider: any): ProviderEntity {
    return new ProviderEntity({
      id: provider._id.toString(),

      authUserId: provider.authUserId,

      displayName: provider.displayName,

      bookingSlug: provider.bookingSlug,

      description: provider.description,

      logoUrl: provider.logoUrl,

      bannerUrl: provider.bannerUrl,

      website: provider.website,

      socialLinks: provider.socialLinks,

      businessName: provider.businessName,

      providerType: provider.providerType,

      providerBusiness: provider.providerBusiness,

      contactInfo: provider.contactInfo,

      location: provider.location,

      timezone: provider.timezone,

      status: provider.status,

      isPublic: provider.isPublic,

      onboardingCompleted: provider.onboardingCompleted,

      moderationNotes: provider.moderationNotes,

      subscriptionPlan: provider.subscriptionPlan,

      subscriptionExpiresAt: provider.subscriptionExpiresAt,

      createdAt: provider.createdAt,

      updatedAt: provider.updatedAt,

      deletedAt: provider.deletedAt,
    });
  }
}

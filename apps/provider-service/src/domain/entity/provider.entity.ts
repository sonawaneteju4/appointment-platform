import { ProviderBusiness } from "../enums/provider-business.enum";

import { ProviderStatus } from "../enums/provider-status.enum";

import { ProviderType } from "../enums/provider-type.enum";

export interface ProviderContactInfo {
  email?: string;

  phone?: string;
}

export interface ProviderLocation {
  address?: string;

  city?: string;

  state?: string;

  zip?: string;

  country?: string;
}

export interface ProviderSocialLink {
  platform: string;

  url: string;
}

export class ProviderEntity {
  public readonly id?: string;

  public readonly authUserId: string;

  public displayName: string;

  public bookingSlug: string;

  public description?: string;

  public logoUrl?: string;

  public bannerUrl?: string;

  public website?: string;

  public socialLinks: ProviderSocialLink[];

  public businessName?: string;

  public providerType: ProviderType;

  public providerBusiness: ProviderBusiness;

  public contactInfo?: ProviderContactInfo;

  public location?: ProviderLocation;

  public timezone: string;

  public status: ProviderStatus;

  public isPublic: boolean;

  public onboardingCompleted: boolean;

  public moderationNotes?: string;

  public subscriptionPlan?: string;

  public subscriptionExpiresAt?: Date;

  public readonly createdAt?: Date;

  public readonly updatedAt?: Date;

  public deletedAt?: Date | null;

  constructor(params: {
    id?: string;

    authUserId: string;

    displayName: string;

    bookingSlug: string;

    description?: string;

    logoUrl?: string;

    bannerUrl?: string;

    website?: string;

    socialLinks?: ProviderSocialLink[];

    businessName?: string;

    providerType: ProviderType;

    providerBusiness: ProviderBusiness;

    contactInfo?: ProviderContactInfo;

    location?: ProviderLocation;

    timezone?: string;

    status?: ProviderStatus;

    isPublic?: boolean;

    onboardingCompleted?: boolean;

    moderationNotes?: string;

    subscriptionPlan?: string;

    subscriptionExpiresAt?: Date;

    createdAt?: Date;

    updatedAt?: Date;

    deletedAt?: Date | null;
  }) {
    this.id = params.id;

    this.authUserId = params.authUserId;

    // -------------------------
    // Branding
    // -------------------------

    this.displayName = params.displayName;

    this.bookingSlug = params.bookingSlug;

    this.description = params.description;

    this.logoUrl = params.logoUrl;

    this.bannerUrl = params.bannerUrl;

    this.website = params.website;

    this.socialLinks = params.socialLinks ?? [];

    // -------------------------
    // Business Information
    // -------------------------

    this.businessName = params.businessName;

    this.providerType = params.providerType;

    this.providerBusiness = params.providerBusiness;

    this.contactInfo = params.contactInfo;

    this.location = params.location;

    this.timezone = params.timezone ?? "Asia/Kolkata";

    // -------------------------
    // Lifecycle
    // -------------------------

    this.status = params.status ?? ProviderStatus.DRAFT;

    this.isPublic = params.isPublic ?? false;

    this.onboardingCompleted = params.onboardingCompleted ?? false;

    // -------------------------
    // Internal Operational
    // -------------------------

    this.moderationNotes = params.moderationNotes;

    this.subscriptionPlan = params.subscriptionPlan;

    this.subscriptionExpiresAt = params.subscriptionExpiresAt;

    // -------------------------
    // Metadata
    // -------------------------

    this.createdAt = params.createdAt;

    this.updatedAt = params.updatedAt;

    this.deletedAt = params.deletedAt ?? null;
  }
}

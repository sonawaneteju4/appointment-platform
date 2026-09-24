import { ProviderBusiness } from "../../domain/enums/provider-business.enum";
import { ProviderType } from "../../domain/enums/provider-type.enum";

export interface CreateProviderDto {
  displayName: string;

  bookingSlug: string;

  description?: string;

  logoUrl?: string;

  bannerUrl?: string;

  website?: string;

  socialLinks?: {
    platform: string;
    url: string;
  }[];

  businessName?: string;

  providerType: ProviderType;

  providerBusiness: ProviderBusiness;

  contactInfo?: {
    email?: string;
    phone?: string;
  };

  location?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };

  timezone?: string;
}
